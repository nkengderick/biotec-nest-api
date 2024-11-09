import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Member, MemberDocument } from '../schemas/member.schema';

@Injectable()
export class MemberRepository {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<MemberDocument>,
  ) {}

  // Create a new member
  async create(member: Partial<Member>): Promise<Member> {
    const newMember = new this.memberModel(member);
    return newMember.save();
  }

  // Find a member by ID
  async findById(id: string): Promise<Member | null> {
    return this.memberModel.findById(id).exec();
  }

  // Find a member by user ID
  async findByUserId(userId: string): Promise<Member | null> {
    return this.memberModel
      .findOne({ user_id: new Types.ObjectId(userId) })
      .populate('user_id')
      .exec();
  }

  // Find all members and populate user_id with the related User data
  async findAll(): Promise<Member[]> {
    const members = await this.memberModel.find().populate('user_id').exec();

    // Ensure user_id is an ObjectId if necessary and cast it if not
    for (const member of members) {
      if (!Types.ObjectId.isValid(member.user_id)) {
        member.user_id = new Types.ObjectId(member.user_id);
        await member.save(); // Save the updated member document with the ObjectId-casted user_id
      }
    }

    // Return populated members with correct user_id types
    return this.memberModel.find().populate('user_id').exec();
  }

  // Update a member by ID
  async update(id: string, member: Partial<Member>): Promise<Member> {
    return this.memberModel.findByIdAndUpdate(id, member, { new: true }).exec();
  }

  // Delete a member by ID
  async delete(id: string): Promise<void> {
    await this.memberModel.findByIdAndDelete(id).exec();
  }
}
