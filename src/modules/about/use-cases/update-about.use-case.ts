import { Injectable, NotFoundException } from '@nestjs/common';
import { AboutRepository } from '../repositories/about.repository';
import { UpdateAboutDto } from '../dto/update-about.dto';
import { About } from '../schemas/about.schema';

@Injectable()
export class UpdateAboutUseCase {
  constructor(private readonly aboutRepository: AboutRepository) {}

  async execute(id: string, updateAboutDto: UpdateAboutDto): Promise<About> {
    // Check if the About document exists
    const about = await this.aboutRepository.findAboutById(id);
    if (!about) {
      throw new NotFoundException('About section not found.');
    }

    // Handle appending or updating specific arrays
    if (updateAboutDto.achievements) {
      about.achievements = this.upsertArray(
        about.achievements,
        updateAboutDto.achievements,
        'title',
      );
    }

    if (updateAboutDto.leadership_team) {
      about.leadership_team = this.upsertArray(
        about.leadership_team,
        updateAboutDto.leadership_team,
        'name',
      );
    }

    if (updateAboutDto.social_links) {
      about.social_links = {
        ...about.social_links,
        ...updateAboutDto.social_links,
      };
    }

    if (updateAboutDto.appendices) {
      about.appendices = this.upsertArray(
        about.appendices,
        updateAboutDto.appendices,
        'url',
      );
    }

    if (updateAboutDto.videos) {
      about.videos = this.upsertArray(
        about.videos,
        updateAboutDto.videos,
        'url',
      );
    }

    if (updateAboutDto.images) {
      about.images = this.upsertArray(
        about.images,
        updateAboutDto.images,
        'url',
      );
    }

    if (updateAboutDto.partnerships) {
      about.partnerships = this.upsertArray(
        about.partnerships,
        updateAboutDto.partnerships,
        'partner',
      );
    }

    // Update the rest of the fields (non-array fields)
    Object.assign(about, {
      name: updateAboutDto.name || about.name,
      slogan: updateAboutDto.slogan || about.slogan,
      logo_url: updateAboutDto.logo_url || about.logo_url,
      cover_photo_url: updateAboutDto.cover_photo_url || about.cover_photo_url,
      mission_statement:
        updateAboutDto.mission_statement || about.mission_statement,
      vision_statement:
        updateAboutDto.vision_statement || about.vision_statement,
      history: updateAboutDto.history || about.history,
      contact_email: updateAboutDto.contact_email || about.contact_email,
      contact_phone: updateAboutDto.contact_phone || about.contact_phone,
      address: updateAboutDto.address || about.address,
      terms_and_conditions:
        updateAboutDto.terms_and_conditions || about.terms_and_conditions,
      privacy_policy: updateAboutDto.privacy_policy || about.privacy_policy,
    });

    return this.aboutRepository.updateAbout(id, about);
  }

  // Helper function to handle upsert logic
  private upsertArray<T>(
    existingArray: T[],
    newArray: T[],
    uniqueKey: string,
  ): T[] {
    const map = new Map(existingArray.map((item) => [item[uniqueKey], item]));

    newArray.forEach((newItem) => {
      map.set(newItem[uniqueKey], {
        ...map.get(newItem[uniqueKey]),
        ...newItem,
      });
    });

    return Array.from(map.values());
  }
}
