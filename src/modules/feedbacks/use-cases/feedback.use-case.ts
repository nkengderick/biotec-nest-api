import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FeedbackRepository } from '../repositories/feedback.repository';
import { CreateFeedbackDto } from '../dto/create-feedback.dto';
import { UpdateFeedbackDto } from '../dto/update-feedback.dto';
import { Feedback } from '../schemas/feedback.schema';
import { UserRepository } from 'src/modules/user-management/repositories/user.repository';
import { EventRepository } from 'src/modules/events/repositories/event.repository';
import { ServiceRepository } from 'src/modules/services/repositories/service.repository';

@Injectable()
export class FeedbackUseCase {
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly userRepository: UserRepository,
    private readonly eventRepository: EventRepository,
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async createFeedback(
    createFeedbackDto: CreateFeedbackDto,
  ): Promise<Feedback> {
    const { userId, serviceId, eventId, type } = createFeedbackDto;

    // Validate that the user exists
    const userExists = await this.userRepository.findById(userId);
    if (!userExists) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Depending on the feedback type, validate that the service or event exists
    if (type === 'testimonial' && serviceId) {
      const serviceExists = await this.serviceRepository.findById(serviceId);
      if (!serviceExists) {
        throw new NotFoundException(`Service with ID ${serviceId} not found`);
      }
    } else if (type === 'review' && eventId) {
      const eventExists = await this.eventRepository.findById(eventId);
      if (!eventExists) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }
    } else {
      throw new BadRequestException(
        'Invalid feedback type or missing serviceId/eventId',
      );
    }

    // If all validations pass, create the feedback
    return this.feedbackRepository.create(createFeedbackDto);
  }

  async getAllFeedbacks(): Promise<Feedback[]> {
    return this.feedbackRepository.findAll();
  }

  async getFeedbackById(id: string): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findById(id);
    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }
    return feedback;
  }

  async updateFeedback(
    id: string,
    updateFeedbackDto: UpdateFeedbackDto,
  ): Promise<Feedback> {
    // Check if the feedback exists before updating
    const feedbackExists = await this.feedbackRepository.findById(id);
    if (!feedbackExists) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }

    // Perform the update if all checks pass
    const updatedFeedback = await this.feedbackRepository.update(
      id,
      updateFeedbackDto,
    );
    return updatedFeedback;
  }

  async deleteFeedback(id: string): Promise<void> {
    // Check if the feedback exists before deleting
    const feedbackExists = await this.feedbackRepository.findById(id);
    if (!feedbackExists) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }

    // Proceed with deletion
    await this.feedbackRepository.delete(id);
  }
}
