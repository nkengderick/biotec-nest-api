import { Injectable } from '@nestjs/common';
import { AboutRepository } from '../repositories/about.repository';
import { About } from '../schemas/about.schema';

@Injectable()
export class GetAboutUseCase {
  constructor(private readonly aboutRepository: AboutRepository) {}

  async execute(): Promise<About> {
    return this.aboutRepository.findAbout();
  }
}
