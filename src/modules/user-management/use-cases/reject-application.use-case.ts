import { Injectable, NotFoundException } from '@nestjs/common';
import { ApplicantRepository } from '../repositories/applicant.repository';
import { UserRepository } from '../repositories/user.repository';
import { SendEmailUseCase } from 'src/common/use-cases/send-email.use-case';

@Injectable()
export class RejectApplicationUseCase {
  constructor(
    private readonly applicantRepository: ApplicantRepository,
    private readonly userRepository: UserRepository,
    private readonly sendEmailUseCase: SendEmailUseCase,
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

    // Send a rejection email using template
    const templateData = {
      userName: user.first_name,
      userEmail: user.email,
      emailTitle: 'Application Status Update',
      actionRequired: false,
      secondaryInfo:
        'We review our membership criteria regularly and encourage you to apply again in the future.',
    };

    await this.sendEmailUseCase.executeTemplated(
      user.email,
      'Application Status Update',
      'reject-application',
      templateData,
    );

    return {
      message: 'Application rejected and email sent to the applicant',
      applicant,
    };
  }
}
