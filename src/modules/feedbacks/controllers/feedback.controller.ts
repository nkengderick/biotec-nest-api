import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { FeedbackService } from '../services/feedback.service';
import { CreateFeedbackDto } from '../dto/create-feedback.dto';
import { UpdateFeedbackDto } from '../dto/update-feedback.dto';
import {
  ApiTags,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  // Create feedback (testimonial or review)
  @Post()
  @ApiOperation({ summary: 'Create a new feedback (testimonial or review)' })
  @ApiBody({ type: CreateFeedbackDto })
  @ApiResponse({ status: 201, description: 'Feedback created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  createFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.createFeedback(createFeedbackDto);
  }

  // Get all feedbacks (testimonials and reviews)
  @Get()
  @ApiOperation({ summary: 'Retrieve all feedback (testimonials and reviews)' })
  @ApiResponse({
    status: 200,
    description: 'Retrieve all feedbacks successfully.',
  })
  getAllFeedbacks() {
    return this.feedbackService.getAllFeedbacks();
  }

  // Get feedback by ID
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific feedback by ID' })
  @ApiParam({ name: 'id', description: 'ID of the feedback to retrieve' })
  @ApiResponse({ status: 200, description: 'Feedback retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Feedback not found.' })
  getFeedbackById(@Param('id') id: string) {
    return this.feedbackService.getFeedbackById(id);
  }

  // Update feedback by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update feedback by ID' })
  @ApiParam({ name: 'id', description: 'ID of the feedback to update' })
  @ApiBody({ type: UpdateFeedbackDto })
  @ApiResponse({ status: 200, description: 'Feedback updated successfully.' })
  @ApiResponse({ status: 404, description: 'Feedback not found.' })
  updateFeedback(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    return this.feedbackService.updateFeedback(id, updateFeedbackDto);
  }

  // Delete feedback by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete feedback by ID' })
  @ApiParam({ name: 'id', description: 'ID of the feedback to delete' })
  @ApiResponse({ status: 200, description: 'Feedback deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Feedback not found.' })
  deleteFeedback(@Param('id') id: string) {
    return this.feedbackService.deleteFeedback(id);
  }
}
