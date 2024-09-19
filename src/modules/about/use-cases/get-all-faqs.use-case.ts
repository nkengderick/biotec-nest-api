import { Injectable } from '@nestjs/common';
import { FaqRepository } from '../repositories/faq.repository';
import { Faq } from '../schemas/faq.schema';

@Injectable()
export class GetAllFaqsUseCase {
  constructor(private readonly faqRepository: FaqRepository) {}

  async execute(): Promise<Faq[]> {
    return this.faqRepository.findAllFaqs();
  }
}
