import { Injectable } from '@nestjs/common';
import { FaqRepository } from '../repositories/faq.repository';
import { CreateFaqDto } from '../dto/create-faq.dto';
import { Faq } from '../schemas/faq.schema';

@Injectable()
export class CreateFaqUseCase {
  constructor(private readonly faqRepository: FaqRepository) {}

  async execute(createFaqDto: CreateFaqDto): Promise<Faq> {
    return this.faqRepository.createFaq(createFaqDto);
  }
}
