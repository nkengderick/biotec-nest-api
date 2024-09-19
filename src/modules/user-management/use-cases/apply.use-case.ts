import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ApplicantRepository } from '../repositories/applicant.repository';
import { ApplyDto } from '../dto/apply.dto';
import { MemberRepository } from '../repositories/member.repository';

@Injectable()
export class ApplyUseCase {
  constructor(
    private readonly applicantRepository: ApplicantRepository,
    private readonly memberRepository: MemberRepository,
  ) {}

  async execute(applyDto: ApplyDto) {
    try {
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
      if (applyDto.referred_by_member_id) {
        const referredMember = await this.memberRepository.findByUserId(
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

      // Return a success message
      return { message: 'Application submitted successfully', applicant };
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
