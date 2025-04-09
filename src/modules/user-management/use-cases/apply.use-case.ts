import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ApplicantRepository } from '../repositories/applicant.repository';
import { ApplyDto } from '../dto/apply.dto';
import { MemberRepository } from '../repositories/member.repository';
import { UserRepository } from 'src/modules/user-management/repositories/user.repository';
import { SendEmailUseCase } from 'src/common/use-cases/send-email.use-case';
import { PaymentsService } from 'src/modules/payment/services/payment.service';
import { CreatePaymentDto } from 'src/modules/payment/dtos/create-payment.dto';

@Injectable()
export class ApplyUseCase {
  constructor(
    private readonly applicantRepository: ApplicantRepository,
    private readonly memberRepository: MemberRepository,
    private readonly userRepository: UserRepository,
    private readonly sendEmailUseCase: SendEmailUseCase,
    private readonly paymentsService: PaymentsService,
  ) {}

  async execute(applyDto: ApplyDto) {
    try {
      // Check if the user exists
      const user = await this.userRepository.findById(
        applyDto.user_id.toString(),
      );
      if (!user) {
        throw new NotFoundException(
          `User with ID ${applyDto.user_id} does not exist`,
        );
      }

      // Check if an applicant with the same user ID already exists
      const existingApplicant = await this.applicantRepository.findByUserId(
        applyDto.user_id.toString(),
      );
      if (existingApplicant) {
        throw new HttpException(
          'Applicant with the same user ID already exists',
          HttpStatus.CONFLICT,
        );
      }

      // Check if the referred member exists (if a referred member ID is provided)
      let referredMember = null;
      if (applyDto.referred_by_member_id) {
        referredMember = await this.memberRepository.findById(
          applyDto.referred_by_member_id.toString(),
        );
        if (!referredMember) {
          throw new HttpException(
            'Referred member does not exist',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      // Proceed with the application process
      const applicant = await this.applicantRepository.create(applyDto);

      // --- 💳 Initiate Payment ---
      const createPaymentDto: CreatePaymentDto = {
        externalId: applicant.user_id.toString(),
        amount: 3000,
        email: user.email,
        message: 'Welcome payment for new user',
        userId: applicant.user_id.toString(),
        currency: 'XAF',
      };

      let paymentLink = '';
      let transactionId = '';

      try {
        const paymentResponse =
          await this.paymentsService.makePayment(createPaymentDto);
        paymentLink = paymentResponse.link;
        transactionId = paymentResponse.transactionId;

        // 📝 Save transactionId to applicant
        await this.applicantRepository.updateByUserId(applicant.user_id.toString(), { transactionId });
      } catch (paymentError) {
        console.error('Payment creation failed:', paymentError);
      }

      // Send confirmation email to the user using template
      const userTemplateData = {
        userName: user.first_name,
        userEmail: user.email,
        emailTitle: 'Application Received',
        actionRequired: true,
        actionUrl: paymentLink,
        actionText: 'Complete Your Application With Payment',
        secondaryInfo:
          'We will review your application and get back to you soon.',
      };

      let emailSent = false;
      try {
        await this.sendEmailUseCase.executeTemplated(
          user.email,
          'Application Received',
          'application-confirmation',
          userTemplateData,
        );
        emailSent = true;
      } catch (emailError) {
        console.error(
          `Failed to send application confirmation email to ${user.email}:`,
          emailError,
        );
      }

      // Send an email to the team about the new applicant
      const teamEmail = process.env.TEAM_EMAIL;
      if (teamEmail) {
        // Prepare data for team notification template
        const teamTemplateData = {
          emailTitle: `New Application: ${user.first_name} ${user.last_name}`,
          userName: 'Team',
          userEmail: teamEmail,
          applicantName: `${user.first_name} ${user.last_name}`,
          applicantEmail: user.email,
          specializationArea: applyDto.specialization_area,
          referredBy: referredMember
            ? `${referredMember.first_name} ${referredMember.last_name}`
            : null,
          secondaryInfo:
            'This is an automated notification from the application system.',
        };

        try {
          await this.sendEmailUseCase.executeTemplated(
            teamEmail,
            `New Application Received: ${user.first_name} ${user.last_name}`,
            'new-applicant-notification',
            teamTemplateData,
          );
          console.log(
            `Email sent to the team at ${teamEmail} about the new applicant.`,
          );
        } catch (teamEmailError) {
          console.error(
            `Failed to send email to the team at ${teamEmail}:`,
            teamEmailError,
          );
        }
      } else {
        console.warn('Team email not set in the environment variables.');
      }

      // Return a success message
      const message = emailSent
        ? 'Application submitted successfully, and confirmation email sent'
        : 'Application submitted successfully, but confirmation email failed to send';

      return { message, applicant };
    } catch (error) {
      console.error('Application process failed:', error);

      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Something went wrong during the application process',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
