import { Injectable, NotFoundException } from '@nestjs/common';
import { FeedbackRepository } from '../repositories/feedback.repository';
import { CreateFeedbackDto } from '../dto/create-feedback.dto';
import { UpdateFeedbackDto } from '../dto/update-feedback.dto';
import { Feedback } from '../schemas/feedback.schema';

@Injectable()
export class FeedbackService {
  constructor(private readonly feedbackRepository: FeedbackRepository) {}

  // Create a new feedback (either testimonial or review)
  async createFeedback(
    createFeedbackDto: CreateFeedbackDto,
  ): Promise<Feedback> {
    return this.feedbackRepository.create(createFeedbackDto);
  }

  // Get all feedback (testimonials and reviews)
  async getAllFeedbacks(): Promise<Feedback[]> {
    return this.feedbackRepository.findAll();
  }

  // Get feedback by ID
  async getFeedbackById(id: string): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findById(id);
    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }
    return feedback;
  }

  // Update feedback by ID
  async updateFeedback(
    id: string,
    updateFeedbackDto: UpdateFeedbackDto,
  ): Promise<Feedback> {
    const updatedFeedback = await this.feedbackRepository.update(
      id,
      updateFeedbackDto,
    );
    if (!updatedFeedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }
    return updatedFeedback;
  }

  // Delete feedback by ID
  async deleteFeedback(id: string): Promise<void> {
    const feedback = await this.feedbackRepository.delete(id);
    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }
  }
}
