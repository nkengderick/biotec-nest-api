import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { About } from '../schemas/about.schema';
import { CreateAboutDto } from '../dto/create-about.dto';
import { UpdateAboutDto } from '../dto/update-about.dto';

@Injectable()
export class AboutRepository {
  constructor(
    @InjectModel(About.name) private readonly aboutModel: Model<About>,
  ) {}

  // Find the About document by its ID
  async findAboutById(id: string): Promise<About | null> {
    return this.aboutModel.findById(id).exec();
  }

  // Find the first About document (assuming there will be only one)
  async findAbout(): Promise<About> {
    return this.aboutModel.findOne().exec();
  }

  // Create a new About document
  async createAbout(createAboutDto: CreateAboutDto): Promise<About> {
    const newAbout = new this.aboutModel(createAboutDto);
    return newAbout.save();
  }

  // Update an existing About document by ID
  async updateAbout(
    id: string,
    updateAboutDto: Partial<About>,
  ): Promise<About> {
    return this.aboutModel.findByIdAndUpdate(id, updateAboutDto, { new: true });
  }
}
