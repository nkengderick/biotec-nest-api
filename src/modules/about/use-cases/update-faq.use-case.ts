import { Injectable, NotFoundException } from '@nestjs/common';
import { FaqRepository } from '../repositories/faq.repository';
import { UpdateFaqDto } from '../dto/update-faq.dto';
import { Faq } from '../schemas/faq.schema';

@Injectable()
export class UpdateFaqUseCase {
  constructor(private readonly faqRepository: FaqRepository) {}

  async execute(id: string, updateFaqDto: UpdateFaqDto): Promise<Faq> {
    const updatedFaq = await this.faqRepository.updateFaq(id, updateFaqDto);
    if (!updatedFaq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }
    return updatedFaq;
  }
}
