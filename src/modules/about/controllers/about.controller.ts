import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { CreateAboutDto } from '../dto/create-about.dto';
import { UpdateAboutDto } from '../dto/update-about.dto';
import { About } from '../schemas/about.schema';
import { CreateFaqDto } from '../dto/create-faq.dto';
import { UpdateFaqDto } from '../dto/update-faq.dto';
import { Faq } from '../schemas/faq.schema';
import { AboutService } from '../services/about.service';
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('About')
@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  // Get the "About" section details
  @Get()
  @ApiOperation({
    summary: 'Get About Details',
    description: 'Retrieve details of the About section.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved the About details.',
    type: About,
  })
  async getAbout(): Promise<About> {
    return this.aboutService.getAbout();
  }

  // Create the "About" section
  @Post()
  @ApiOperation({
    summary: 'Create About Section',
    description: 'Create a new About section with the provided details.',
  })
  @ApiBody({ type: CreateAboutDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The About section has been successfully created.',
    type: About,
  })
  async createAbout(@Body() createAboutDto: CreateAboutDto): Promise<About> {
    return this.aboutService.createAbout(createAboutDto);
  }

  // Update the "About" section by ID
  @Put(':id')
  @ApiOperation({
    summary: 'Update About Section',
    description: 'Update an existing About section by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the About section document to update',
    type: String,
  })
  @ApiBody({ type: UpdateAboutDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The About section has been successfully updated.',
    type: About,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The About section with the given ID was not found.',
  })
  async updateAbout(
    @Param('id') id: string,
    @Body() updateAboutDto: UpdateAboutDto,
  ): Promise<About> {
    return this.aboutService.updateAbout(id, updateAboutDto);
  }

  // FAQ Operations

  // Create a new FAQ
  @Post('faqs')
  @ApiOperation({
    summary: 'Create FAQ',
    description: 'Create a new FAQ entry.',
  })
  @ApiBody({ type: CreateFaqDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'FAQ created successfully.',
    type: Faq,
  })
  async createFaq(@Body() createFaqDto: CreateFaqDto): Promise<Faq> {
    return this.aboutService.createFaq(createFaqDto);
  }

  // Get all FAQs
  @Get('faqs')
  @ApiOperation({
    summary: 'Get All FAQs',
    description: 'Retrieve a list of all FAQs.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all FAQs retrieved successfully.',
    type: [Faq],
  })
  async getAllFaqs(): Promise<Faq[]> {
    return this.aboutService.findAllFaqs();
  }

  // Update an FAQ by ID
  @Put('faqs/:id')
  @ApiOperation({
    summary: 'Update FAQ by ID',
    description: 'Update a specific FAQ by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the FAQ to update',
    type: String,
  })
  @ApiBody({ type: UpdateFaqDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'FAQ updated successfully.',
    type: Faq,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'FAQ with the given ID not found.',
  })
  async updateFaq(
    @Param('id') id: string,
    @Body() updateFaqDto: UpdateFaqDto,
  ): Promise<Faq> {
    return this.aboutService.updateFaq(id, updateFaqDto);
  }

  // Delete an FAQ by ID
  @Delete('faqs/:id')
  @ApiOperation({
    summary: 'Delete FAQ by ID',
    description: 'Delete a specific FAQ by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the FAQ to delete',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'FAQ deleted successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'FAQ with the given ID not found.',
  })
  async deleteFaq(@Param('id') id: string): Promise<void> {
    return this.aboutService.deleteFaq(id);
  }
}
