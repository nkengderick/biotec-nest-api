import { Injectable } from '@nestjs/common';
import { ApplicantRepository } from '../repositories/applicant.repository';

@Injectable()
export class AcceptApplicationUseCase {
  constructor(private readonly applicantRepository: ApplicantRepository) {}

  async execute(applicantId: string) {
    return this.applicantRepository.acceptApplicant(applicantId);
  }
}
