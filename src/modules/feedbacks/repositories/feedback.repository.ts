import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback, FeedbackDocument } from '../schemas/feedback.schema';
import { CreateFeedbackDto } from '../dto/create-feedback.dto';
import { UpdateFeedbackDto } from '../dto/update-feedback.dto';

@Injectable()
export class FeedbackRepository {
  constructor(
    @InjectModel(Feedback.name)
    private readonly feedbackModel: Model<FeedbackDocument>,
  ) {}

  // Create feedback
  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const newFeedback = new this.feedbackModel(createFeedbackDto);
    return newFeedback.save();
  }

  // Get all feedbacks
  async findAll(): Promise<Feedback[]> {
    return this.feedbackModel.find().exec();
  }

  // Get feedback by ID
  async findById(id: string): Promise<Feedback> {
    return this.feedbackModel.findById(id).exec();
  }

  // Update feedback by ID
  async update(
    id: string,
    updateFeedbackDto: UpdateFeedbackDto,
  ): Promise<Feedback> {
    return this.feedbackModel
      .findByIdAndUpdate(id, updateFeedbackDto, { new: true })
      .exec();
  }

  // Delete feedback by ID
  async delete(id: string): Promise<Feedback> {
    return this.feedbackModel.findByIdAndDelete(id).exec();
  }
}
