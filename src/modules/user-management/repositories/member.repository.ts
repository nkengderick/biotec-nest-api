import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Member, MemberDocument } from '../schemas/member.schema';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class MemberRepository {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<MemberDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
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
    // Ensure userId is treated as a string and not an ObjectId
    const member = await this.memberModel.findOne({ user_id: userId }).exec();
    if (!member) return null;

    // Fetch the associated user by its ObjectId, ensuring we only work with ObjectId for `user_id`
    const user = await this.userModel.findById(member.user_id).exec();
    if (!user) return null;

    // Return combined object with both member and user information
    return {
      ...member.toObject(), // member data
    };
  }

  // Find applicants by user ID
  async findByUserId2(userId: string): Promise<any | null> {
    try {
      // Find the applicant with the given user ID
      const member = await this.memberModel.findOne({ user_id: userId }).exec();
      if (!member) {
        return null; // Return null if no applicant is found
      }

      // Fetch all users once
      const users = await this.userModel.find().exec();

      // Map users and members for quick lookups
      const usersMap = new Map(
        users.map((user) => [user._id.toString(), user]),
      );

      // Enrich the applicant with user and member data
      const userIdString = member.user_id ? member.user_id.toString() : null; // Safely convert to string

      const user = userIdString ? usersMap.get(userIdString) : null; // Lookup user if userId is valid

      return {
        ...member.toObject(), // Convert Mongoose document to plain object
        user: user || null, // Add user data or null if not found
      };
    } catch (error) {
      console.error('Error fetching member or users:', error);
      throw new Error('Could not fetch data'); // or handle it as needed
    }
  }

  // Find all members and populate user_id with the related User data
  async findAll(): Promise<Member[]> {
    // Return populated members with correct user_id types
    return this.memberModel.find().exec();
  }

  // Update a member by ID
  async update(id: string, member: Partial<Member>): Promise<Member> {
    return this.memberModel.findByIdAndUpdate(id, member, { new: true }).exec();
  }

  // Delete a member by ID
  async delete(id: string): Promise<void> {
    await this.memberModel.findByIdAndDelete(id).exec();
  }

  async findAllMembers(): Promise<Member[]> {
    try {
      // Fetch all applicants
      const members = await this.memberModel.find().exec();

      // Fetch all users and members once
      const users = await this.userModel.find().exec();

      // Map users and members for quick lookups
      const usersMap = new Map(
        users.map((user) => [user._id.toString(), user]),
      );

      // Enrich each applicant with user and member data
      const enrichedMembers = members.map((member) => {
        // Check if user_id is defined
        const userId = member.user_id ? member.user_id.toString() : null; // Safely convert to string

        const user = userId ? usersMap.get(userId) : null; // Lookup user if userId is valid

        return {
          ...member.toObject(), // Convert Mongoose document to plain object
          user: user || null, // Add user data or null if not found
        };
      });

      // Return enriched applicants
      return enrichedMembers;
    } catch (error) {
      console.error('Error fetching members:', error);
      throw new Error('Could not fetch data'); // or handle it as needed
    }
  }
}
