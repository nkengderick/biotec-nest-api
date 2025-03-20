import { Injectable, NotFoundException } from '@nestjs/common';
import { ApplicantRepository } from '../repositories/applicant.repository';
import { UserRepository } from '../repositories/user.repository';
import { MemberRepository } from '../repositories/member.repository'; // Import MemberRepository
import { SendEmailUseCase } from 'src/common/use-cases/send-email.use-case';

@Injectable()
export class AcceptApplicationUseCase {
  constructor(
    private readonly applicantRepository: ApplicantRepository,
    private readonly userRepository: UserRepository,
    private readonly memberRepository: MemberRepository, // Inject MemberRepository
    private readonly sendEmailUseCase: SendEmailUseCase,
  ) {}

  async execute(applicantId: string) {
    // 1. Find the applicant
    const applicant = await this.applicantRepository.findById(applicantId);

    if (!applicant) {
      throw new NotFoundException(`Applicant with ID ${applicantId} not found`);
    }

    // 2. Update the user type to 'member'
    const updatedUser = await this.userRepository.update(
      applicant.user_id.toString(),
      {
        user_type: 'member',
      },
    );

    if (!updatedUser) {
      throw new NotFoundException(
        `User with ID ${applicant.user_id} not found`,
      );
    }

    // 3. Create a new member based on applicant data
    const newMember = await this.memberRepository.create({
      user_id: applicant.user_id,
      specialization: applicant.specialization_area,
      resume_url: applicant.resume_url,
      profile_photo_url: applicant.profile_photo_url,
      // Add other relevant fields from applicant to member
      // For example:
      // bio: applicant.bio,
      // ...
    });

    if (!newMember) {
      throw new Error('Failed to create new member');
    }

    // 5. Send a congratulatory email to the user
    const subject = 'Congratulations! Your Application Has Been Approved';
    const textContent = `
      Dear ${updatedUser.first_name},

      Congratulations! We are pleased to inform you that your application has been approved. You are now officially a member.

      Next Steps:
      - Log in to your account to access member-exclusive resources.
      - Connect with our community, contribute in projects and participate in upcoming events.

      If you have any questions, feel free to reach out.

      Best regards,
      BioTec Universe Team
    `;

    const htmlContent = `
      <p>Dear ${updatedUser.first_name},</p>
      <p>Congratulations! We are pleased to inform you that your application has been approved. You are now officially a member.</p>
      <p><strong>Next Steps:</strong></p>
      <ul>
        <li>Log in to your account to access member-exclusive resources.</li>
        <li>Connect with our community, contribute in projects and participate in upcoming events.</li>
      </ul>
      <p>If you have any questions, feel free to reach out.</p>
      <p>Best regards,<br />BioTec Universe Team</p>
    `;

    await this.sendEmailUseCase.execute(
      updatedUser.email,
      subject,
      textContent,
      htmlContent,
    );

    return {
      message:
        'Application accepted, user promoted to member, new member created, and email sent',
      applicant,
      updatedUser,
      newMember,
    };
  }
}
