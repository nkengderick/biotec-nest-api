import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Feedback, FeedbackDocument } from '../schemas/feedback.schema';
import { CreateFeedbackDto } from '../dto/create-feedback.dto';
import { UpdateFeedbackDto } from '../dto/update-feedback.dto';

@Injectable()
export class FeedbackRepository {
  constructor(
    @InjectModel(Feedback.name)
    private readonly feedbackModel: Model<FeedbackDocument>,
  ) {}

  // Helper function to convert string IDs to ObjectId
  private convertToObjectId(id: string): Types.ObjectId {
    return new Types.ObjectId(id);
  }

    // Script to check and convert all string IDs to ObjectId in the database
  private async convertStringIdsToObjectIds(): Promise<void> {
    const feedbacks = await this.feedbackModel.find().exec();
    
    for (const feedback of feedbacks) {
      let hasChanges = false;

      if (feedback.serviceId && typeof feedback.serviceId === 'string') {
        feedback.serviceId = this.convertToObjectId(feedback.serviceId);
        hasChanges = true;
      }

      if (feedback.userId && typeof feedback.userId === 'string') {
        feedback.userId = this.convertToObjectId(feedback.userId);
        hasChanges = true;
      }

      if (feedback.eventId && typeof feedback.eventId === 'string') {
        feedback.eventId = this.convertToObjectId(feedback.eventId);
        hasChanges = true;
      }

      // Save the document if any changes were made
      if (hasChanges) {
        await feedback.save();
      }
    }
  }

  // Create feedback
  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    // Convert string IDs to ObjectId before saving
    const feedbackData = {
      ...createFeedbackDto,
      serviceId: this.convertToObjectId(createFeedbackDto.serviceId),
      userId: this.convertToObjectId(createFeedbackDto.userId),
      // If there's an eventId, also convert it
      eventId: createFeedbackDto.eventId ? this.convertToObjectId(createFeedbackDto.eventId) : undefined,
    };

    const newFeedback = new this.feedbackModel(feedbackData);
    return newFeedback.save();
  }

  // Get all feedbacks
  async findAll(): Promise<Feedback[]> {
    
    // Ensure all string IDs are converted to ObjectId before fetching
    await this.convertStringIdsToObjectIds();
    
    return this.feedbackModel
      .find()
      .populate('serviceId') // Assuming these are references to other collections
      .populate('eventId')   // Populate only if there's an eventId
      .populate('userId')    // Populate userId reference
      .exec();
  }

  // Get feedback by ID
  async findById(id: string): Promise<Feedback> {
    return this.feedbackModel
      .findById(this.convertToObjectId(id))  // Convert string ID to ObjectId before querying
      .populate('serviceId')
      .populate('eventId')
      .populate('userId')
      .exec();
  }

  // Update feedback by ID
  async update(
    id: string,
    updateFeedbackDto: UpdateFeedbackDto,
  ): Promise<Feedback> {
    // Convert string IDs to ObjectId before updating
    const updatedData = {
      ...updateFeedbackDto,
    };

    return this.feedbackModel
      .findByIdAndUpdate(this.convertToObjectId(id), updatedData, { new: true })
      .populate('serviceId')
      .populate('eventId')
      .populate('userId')
      .exec();
  }

  // Delete feedback by ID
  async delete(id: string): Promise<Feedback> {
    return this.feedbackModel
      .findByIdAndDelete(this.convertToObjectId(id))  // Convert string ID to ObjectId before deleting
      .exec();
  }
}
