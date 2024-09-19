import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Applicant, ApplicantDocument } from '../schemas/applicant.schema';

@Injectable()
export class ApplicantRepository {
  constructor(
    @InjectModel(Applicant.name)
    private applicantModel: Model<ApplicantDocument>,
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
  async findByUserId(userId: string): Promise<Applicant | null> {
    return this.applicantModel.findOne({ user_id: userId }).exec();
  }

  // Update an applicant by ID
  async update(id: string, applicant: Partial<Applicant>): Promise<Applicant> {
    return this.applicantModel
      .findByIdAndUpdate(id, applicant, { new: true })
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
}
