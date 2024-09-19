import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  // Find members by user ID
  async findByUserId(userId: string): Promise<Member | null> {
    return this.memberModel.findOne({ user_id: userId }).exec();
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
