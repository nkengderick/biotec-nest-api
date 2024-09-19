import { Injectable, ConflictException } from '@nestjs/common';
import { AboutRepository } from '../repositories/about.repository';
import { CreateAboutDto } from '../dto/create-about.dto';
import { About } from '../schemas/about.schema';

@Injectable()
export class CreateAboutUseCase {
  constructor(private readonly aboutRepository: AboutRepository) {}

  async execute(createAboutDto: CreateAboutDto): Promise<About> {
    // Check if an "About" document already exists
    const existingAbout = await this.aboutRepository.findAbout();

    if (existingAbout) {
      // Throw a ConflictException if the "About" document already exists
      throw new ConflictException(
        'An About section already exists. You can only update the existing one.',
      );
    }

    // Create a new "About" document if none exists
    return this.aboutRepository.createAbout(createAboutDto);
  }
}
