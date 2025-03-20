import { Injectable, NotFoundException } from '@nestjs/common';
import { ApplicantRepository } from '../repositories/applicant.repository';
import { UserRepository } from '../repositories/user.repository';
import { SendEmailUseCase } from 'src/common/use-cases/send-email.use-case';

@Injectable()
export class RejectApplicationUseCase {
  constructor(
    private readonly applicantRepository: ApplicantRepository,
    private readonly userRepository: UserRepository,
    private readonly sendEmailUseCase: SendEmailUseCase, // Inject SendEmailUseCase
  ) {}

  async execute(applicantId: string) {
    // Reject the application
    const applicant =
      await this.applicantRepository.rejectApplicant(applicantId);

    if (!applicant) {
      throw new NotFoundException(`Applicant with ID ${applicantId} not found`);
    }

    // Fetch user details
    const user = await this.userRepository.findById(
      applicant.user_id.toString(),
    );

    if (!user) {
      throw new NotFoundException(
        `User with ID ${applicant.user_id} not found`,
      );
    }

    // Send a rejection email
    const subject = 'Application Status Update';
    const textContent = `
      Dear ${user.first_name},

      Thank you for applying. After careful review, we regret to inform you that your application was not approved at this time.

      We appreciate your interest and encourage you to apply again in the future.

      Best regards,  
      BioTec Universe Team
    `;

    const htmlContent = `
      <p>Dear ${user.first_name},</p>
      <p>Thank you for applying. After careful review, we regret to inform you that your application was not approved at this time.</p>
      <p>We appreciate your interest and encourage you to apply again in the future.</p>
      <p>Best regards,<br />BioTec Universe Team</p>
    `;

    await this.sendEmailUseCase.execute(
      user.email,
      subject,
      textContent,
      htmlContent,
    );

    return {
      message: 'Application rejected and email sent to the applicant',
      applicant,
    };
  }
}
