import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ApplicantRepository } from '../repositories/applicant.repository';
import { ApplyDto } from '../dto/apply.dto';
import { MemberRepository } from '../repositories/member.repository';
import { UserRepository } from 'src/modules/user-management/repositories/user.repository';
import { SendEmailUseCase } from 'src/common/use-cases/send-email.use-case';

@Injectable()
export class ApplyUseCase {
  constructor(
    private readonly applicantRepository: ApplicantRepository,
    private readonly memberRepository: MemberRepository,
    private readonly userRepository: UserRepository,
    private readonly sendEmailUseCase: SendEmailUseCase, // Inject email service
  ) {}

  async execute(applyDto: ApplyDto) {
    try {
      // Check if the user exists
      const user = await this.userRepository.findById(applyDto.user_id.toString());
      if (!user) {
        throw new NotFoundException(`User with ID ${applyDto.user_id} does not exist`);
      }

      // Check if an applicant with the same user ID already exists
      const existingApplicant = await this.applicantRepository.findByUserId(applyDto.user_id.toString());
      if (existingApplicant) {
        throw new HttpException('Applicant with the same user ID already exists', HttpStatus.CONFLICT);
      }

      // Check if the referred member exists (if a referred member ID is provided)
      if (applyDto.referred_by_member_id) {
        const referredMember = await this.memberRepository.findById(applyDto.referred_by_member_id.toString());
        if (!referredMember) {
          throw new HttpException('Referred member does not exist', HttpStatus.BAD_REQUEST);
        }
      }

      // Proceed with the application process
      const applicant = await this.applicantRepository.create(applyDto);

      // Send confirmation email to the user
      const subject = 'Application Received';
      const text = `
        Dear ${user.first_name},

        We have received your application. Thank you for applying to join us!

        Best regards,
        The Team
      `;

      const html = `
        <p>Dear ${user.first_name},</p>
        <p>We have received your application. Thank you for applying to join us!</p>
        <p>Best regards,<br />The Team</p>
      `;

      let emailSent = false;
      try {
        await this.sendEmailUseCase.execute(user.email, subject, text, html);
        emailSent = true;
      } catch (emailError) {
        console.error(`Failed to send application confirmation email to ${user.email}:`, emailError);
      }

      // Send an email to the team about the new applicant
      const teamEmail = process.env.TEAM_EMAIL;
      if (teamEmail) {
        const teamSubject = `New Applicant: ${user.first_name} ${user.last_name}`;
        const teamText = `
          Dear Team,

          A new applicant has submitted their application.

          Applicant Details:
          - Name: ${user.first_name} ${user.last_name}
          - Email: ${user.email}
          - Specialization Area: ${applyDto.specialization_area}

          Best regards,
          The Application System
        `;

        const teamHtml = `
          <p>Dear Team,</p>
          <p>A new applicant has submitted their application.</p>
          <p><strong>Applicant Details:</strong></p>
          <ul>
            <li><strong>Name:</strong> ${user.first_name} ${user.last_name}</li>
            <li><strong>Email:</strong> ${user.email}</li>
            <li><strong>Specialization Area:</strong> ${applyDto.specialization_area}</li>
          </ul>
          <p>Best regards,<br />The Application System</p>
        `;

        try {
          await this.sendEmailUseCase.execute(teamEmail, teamSubject, teamText, teamHtml);
          console.log(`Email sent to the team at ${teamEmail} about the new applicant.`);
        } catch (teamEmailError) {
          console.error(`Failed to send email to the team at ${teamEmail}:`, teamEmailError);
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
        throw new HttpException('Something went wrong during the application process', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
