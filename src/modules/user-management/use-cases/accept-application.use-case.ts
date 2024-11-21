import { Injectable, NotFoundException } from '@nestjs/common';
import { ApplicantRepository } from '../repositories/applicant.repository';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class AcceptApplicationUseCase {
  constructor(
    private readonly applicantRepository: ApplicantRepository,
    private readonly userRepository: UserRepository, // Inject UserRepository
  ) {}

  async execute(applicantId: string) {
    // Accept the application in the Applicant repository
    const applicant =
      await this.applicantRepository.acceptApplicant(applicantId);

    if (!applicant) {
      throw new NotFoundException(`Applicant with ID ${applicantId} not found`);
    }

    // Update the user type to 'member' in the User repository
    const updatedUser = await this.userRepository.update(applicant.user_id.toString(), {
      user_type: 'member',
    });

    if (!updatedUser) {
      throw new NotFoundException(
        `User with ID ${applicant.user_id} not found`,
      );
    }

    return {
      message: 'Application accepted and user promoted to member',
      applicant,
      updatedUser,
    };
  }
}
