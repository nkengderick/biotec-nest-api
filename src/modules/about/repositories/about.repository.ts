import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { About } from '../schemas/about.schema';
import { CreateAboutDto } from '../dto/create-about.dto';
import { Member } from 'src/modules/user-management/schemas/member.schema';

@Injectable()
export class AboutRepository {
  constructor(
    @InjectModel(About.name) private readonly aboutModel: Model<About>,
    @InjectModel(Member.name) private readonly memberModel: Model<Member>,
  ) {}

  // Find the About document by its ID and populate both member and user_id fields
  async findAboutById(id: string): Promise<About | null> {
    return this.aboutModel
      .findById(id)
      .populate({
        path: 'leadership_team.member', // Populate the member object from leadership team
        populate: { path: 'user_id', model: 'User' } // Nested populate to get user_id inside member
      })
      .exec();
  }

  // Find the first About document and populate both member and user_id fields
async findAbout(): Promise<About> {
  // Fetch all members
  const members = await this.memberModel.find(); 

  // Loop through members to ensure the user_id is cast as ObjectId if necessary
  for (const member of members) {
    if (typeof member.user_id !== 'object' || !(member.user_id instanceof Types.ObjectId)) {
      // If user_id is not an ObjectId, cast it
      member.user_id = new Types.ObjectId(member.user_id);
      await member.save(); // Save the updated member document
    }
  }

  // Fetch the About document, populating both member and user_id fields
  return this.aboutModel
    .findOne()
    .populate({
      path: 'leadership_team.member',
      model: 'Member',
      populate: { path: 'user_id', model: 'User' },  // Nested population of user_id
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
        path: 'leadership_team.member', // Populate the member object from leadership team
        populate: { path: 'user_id', model: 'User' } // Nested populate to get user_id inside member
      })
      .exec();
  }
}
