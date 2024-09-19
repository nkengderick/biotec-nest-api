import { Injectable } from '@nestjs/common';
import { ApplicantRepository } from '../repositories/applicant.repository';

@Injectable()
export class RejectApplicationUseCase {
  constructor(private readonly applicantRepository: ApplicantRepository) {}

  async execute(applicantId: string) {
    return this.applicantRepository.rejectApplicant(applicantId);
  }
}
