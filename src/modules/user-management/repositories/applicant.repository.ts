import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, Types } from 'mongoose';
import { Applicant, ApplicantDocument } from '../schemas/applicant.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { Member, MemberDocument } from '../schemas/member.schema';

@Injectable()
export class ApplicantRepository {
  constructor(
    @InjectModel(Applicant.name)
    private applicantModel: Model<ApplicantDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Member.name)
    private memberModel: Model<MemberDocument>,
  ) {}

  // Create a new applicant
  async create(applicant: Partial<Applicant>): Promise<Applicant> {
    const newApplicant = new this.applicantModel(applicant);
    return newApplicant.save();
  }

  // Find an applicant by ID
  async findById(id: string): Promise<Applicant | null> {
    return this.applicantModel.findById(id).exec();
  }

  // Find applicants by user ID
  async findByUserId(userId: string): Promise<any | null> {
    try {
      // Find the applicant with the given user ID
      const applicant = await this.applicantModel
        .findOne({ user_id: userId })
        .exec();
      if (!applicant) {
        return null; // Return null if no applicant is found
      }

      // Fetch all users and members once
      const users = await this.userModel.find().exec();
      const members = await this.memberModel.find().populate('user_id').exec();

      // Map users and members for quick lookups
      const usersMap = new Map(
        users.map((user) => [user._id.toString(), user]),
      );
      const membersMap = new Map(
        members.map((member) => [member._id.toString(), member]),
      );

      // Enrich the applicant with user and member data
      const userIdString = applicant.user_id
        ? applicant.user_id.toString()
        : null; // Safely convert to string
      const memberIdString = applicant.referred_by_member_id
        ? applicant.referred_by_member_id.toString()
        : null; // Safely convert to string

      const user = userIdString ? usersMap.get(userIdString) : null; // Lookup user if userId is valid
      const member = memberIdString ? membersMap.get(memberIdString) : null; // Lookup member if memberId is valid

      return {
        ...applicant.toObject(), // Convert Mongoose document to plain object
        user: user || null, // Add user data or null if not found
        referredByMember: member || null, // Add member data or null if not found
      };
    } catch (error) {
      console.error('Error fetching applicant, users, or members:', error);
      throw new Error('Could not fetch data'); // or handle it as needed
    }
  }

  // Update an applicant by ID
  async update(id: string, applicant: Partial<Applicant>): Promise<Applicant> {
    return this.applicantModel
      .findByIdAndUpdate(id, applicant, { new: true })
      .exec();
  }

  // Update an applicant by user_id
  async updateByUserId(
    userId: string,
    applicant: Partial<Applicant>,
  ): Promise<Applicant> {
    return this.applicantModel
      .findOneAndUpdate({ user_id: userId }, applicant, { new: true })
      .exec();
  }

  // Delete an applicant by ID
  async delete(id: string): Promise<void> {
    await this.applicantModel.findByIdAndDelete(id).exec();
  }

  // Find applicants by status (e.g., pending, approved, rejected)
  async findByStatus(status: string): Promise<Applicant[]> {
    return this.applicantModel.find({ application_status: status }).exec();
  }

  // Accept an applicant by updating their status
  async acceptApplicant(id: string): Promise<Applicant> {
    return this.update(id, {
      application_status: 'approved',
      reviewed_at: new Date(),
    });
  }

  // Reject an applicant by updating their status
  async rejectApplicant(id: string): Promise<Applicant> {
    return this.update(id, {
      application_status: 'rejected',
      reviewed_at: new Date(),
    });
  }

  async findAll(): Promise<Applicant[]> {
    try {
      // Fetch all applicants
      const applicants = await this.applicantModel.find().exec();

      // Fetch all users and members once
      const users = await this.userModel.find().exec();
      const members = await this.memberModel.find().populate('user_id').exec();

      // Map users and members for quick lookups
      const usersMap = new Map(
        users.map((user) => [user._id.toString(), user]),
      );
      const membersMap = new Map(
        members.map((member) => [member._id.toString(), member]),
      );

      // Enrich each applicant with user and member data
      const enrichedApplicants = applicants.map((applicant) => {
        // Check if user_id is defined
        const userId = applicant.user_id ? applicant.user_id.toString() : null; // Safely convert to string
        const memberId = applicant.referred_by_member_id
          ? applicant.referred_by_member_id.toString()
          : null; // Safely convert to string

        const user = userId ? usersMap.get(userId) : null; // Lookup user if userId is valid
        const member = memberId ? membersMap.get(memberId) : null; // Lookup member if memberId is valid

        return {
          ...applicant.toObject(), // Convert Mongoose document to plain object
          user: user || null, // Add user data or null if not found
          referredByMember: member || null, // Add member data or null if not found
        };
      });

      // Return enriched applicants
      return enrichedApplicants;
    } catch (error) {
      console.error('Error fetching applicants, users, or members:', error);
      throw new Error('Could not fetch data'); // or handle it as needed
    }
  }
}
