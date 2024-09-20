import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { About } from '../schemas/about.schema';
import { CreateAboutDto } from '../dto/create-about.dto';

@Injectable()
export class AboutRepository {
  constructor(
    @InjectModel(About.name) private readonly aboutModel: Model<About>,
  ) {}

  // Find the About document by its ID and populate both member and user_id fields
  async findAboutById(id: string): Promise<About | null> {
    return this.aboutModel
      .findById(id)
      .populate({
        path: 'leadership_team.member',
        populate: { path: 'user_id' },
      })
      .exec();
  }

  // Find the first About document (assuming there will be only one) and populate both member and user_id fields
  async findAbout(): Promise<About> {
    return this.aboutModel
      .findOne()
      .populate({
        path: 'leadership_team.member',
        populate: { path: 'user_id' },
      })
      .exec();
  }

  // Create a new About document
  async createAbout(createAboutDto: CreateAboutDto): Promise<About> {
    const newAbout = new this.aboutModel(createAboutDto);
    return newAbout.save();
  }

  // Update an existing About document by ID and return the updated document with populated member and user_id fields
  async updateAbout(
    id: string,
    updateAboutDto: Partial<About>,
  ): Promise<About> {
    return this.aboutModel
      .findByIdAndUpdate(id, updateAboutDto, { new: true })
      .populate({
        path: 'leadership_team.member',
        populate: { path: 'user_id' }, 
      })
      .exec();
  }
}
