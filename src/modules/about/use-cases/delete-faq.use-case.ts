import { Injectable, NotFoundException } from '@nestjs/common';
import { FaqRepository } from '../repositories/faq.repository';

@Injectable()
export class DeleteFaqUseCase {
  constructor(private readonly faqRepository: FaqRepository) {}

  async execute(id: string): Promise<void> {
    const result = await this.faqRepository.deleteFaq(id);
    if (!result) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }
  }
}
