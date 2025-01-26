import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsEnum,
  IsOptional,
  IsUrl,
  IsArray,
  ValidateNested,
  IsNumber,
  Min,
  Max,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// Milestone DTO
export class MilestoneDto {
  @ApiProperty({
    description: 'Title of the milestone',
    example: 'Research Phase',
  })
  @IsNotEmpty({ message: 'Milestone title should not be empty' })
  @IsString({ message: 'Milestone title must be a string' })
  readonly title: string;

  @ApiProperty({
    description: 'Completion status of the milestone',
    example: true,
  })
  @IsNotEmpty({ message: 'Milestone completion status is required' })
  @IsBoolean({ message: 'Milestone completion must be a boolean value' })
  readonly completed: boolean;
}

// Multimedia DTO
export class MultimediaDto {
  @ApiProperty({
    description: 'Type of the multimedia (e.g., image, video)',
    example: 'image',
  })
  @IsNotEmpty({ message: 'Multimedia type should not be empty' })
  @IsString({ message: 'Multimedia type must be a string' })
  readonly type: string;

  @ApiProperty({
    description: 'URL of the multimedia resource',
    example: 'http://example.com/image.png',
  })
  @IsNotEmpty({ message: 'Multimedia URL should not be empty' })
  @IsUrl({}, { message: 'Multimedia URL must be a valid URL' })
  readonly url: string;
}

// Document DTO
export class DocumentDto {
  @ApiProperty({
    description: 'Type of the document (e.g., pdf, doc)',
    example: 'Progress Report',
  })
  @IsNotEmpty({ message: 'Document name should not be empty' })
  @IsString({ message: 'Document name must be a string' })
  readonly name: string;

  @ApiProperty({
    description: 'URL of the Document resource',
    example: 'http://example.com/doc.doc',
  })
  @IsNotEmpty({ message: 'Document URL should not be empty' })
  @IsUrl({}, { message: 'Document URL must be a valid URL' })
  readonly url: string;
}

// Collaboration Opportunity DTO
export class CollaborationOpportunityDto {
  @ApiProperty({
    description: 'Expertise required for the collaboration',
    example: 'Microbiology',
  })
  @IsNotEmpty({ message: 'Collaboration expertise should not be empty' })
  @IsString({ message: 'Collaboration expertise must be a string' })
  readonly expertise: string;

  @ApiProperty({
    description: 'Description of the collaboration opportunity',
    example: 'Looking for a microbiologist to collaborate on this project.',
  })
  @IsNotEmpty({ message: 'Collaboration description should not be empty' })
  @IsString({ message: 'Collaboration description must be a string' })
  readonly description: string;
}

// Partner DTO
export class PartnerDto {
  @ApiProperty({
    description: 'Name of the partner organization',
    example: 'XYZ University',
  })
  @IsNotEmpty({ message: 'Partner name should not be empty' })
  @IsString({ message: 'Partner name must be a string' })
  readonly name: string;

  @ApiProperty({
    description: 'URL to the partner organization logo (optional)',
    example: 'http://example.com/logo.png',
  })
  @IsOptional()
  @IsUrl({}, { message: 'Partner logo URL must be a valid URL' })
  readonly logoUrl?: string;
}

// Create Project DTO
export class CreateProjectDto {
  @ApiProperty({
    description: 'The title of the project',
    example: 'Biotech Research Project',
  })
  @IsNotEmpty({ message: 'Title should not be empty' })
  @IsString({ message: 'Title must be a string' })
  readonly title: string;

  @ApiProperty({
    description: 'A short summary of the project',
    example: 'This project focuses on biotech innovations.',
  })
  @IsNotEmpty({ message: 'Summary should not be empty' })
  @IsString({ message: 'Summary must be a string' })
  readonly summary: string;

  @ApiProperty({
    description: 'Detailed description of the project',
    example: '<p>This project focuses on biotech innovations...</p>',
  })
  @IsNotEmpty({ message: 'Description should not be empty' })
  @IsString({ message: 'Description must be a string' })
  readonly description: string;

  @ApiProperty({
    description: 'Start date of the project',
    example: '2024-09-18',
  })
  @IsNotEmpty({ message: 'Start date is required' })
  @Type(() => Date)
  @IsDate({ message: 'Start date must be a valid date' })
  readonly startDate: Date;

  @ApiProperty({
    description: 'End date of the project (Optional)',
    example: '2025-05-01',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'End date must be a valid date' })
  readonly endDate?: Date;

  @ApiProperty({
    description: 'Current status of the project',
    example: 'ongoing',
    enum: ['ongoing', 'completed', 'upcoming'],
  })
  @IsNotEmpty({ message: 'Status is required' })
  @IsEnum(['ongoing', 'completed', 'upcoming'], {
    message: 'Status must be either ongoing, upcoming or completed',
  })
  readonly status: 'ongoing' | 'completed' | 'upcoming';

  @ApiProperty({
    description: 'Category of the project (e.g., research, education)',
    example: 'research',
  })
  @IsNotEmpty({ message: 'Category should not be empty' })
  @IsString({ message: 'Category must be a string' })
  readonly category: string;

  @ApiProperty({
    description: 'URL to the project image (Optional)',
    example: 'http://example.com/image.png',
    required: false,
  })
  @IsOptional()
  @IsUrl({}, { message: 'Project image must be a valid URL' })
  readonly projectImageUrl?: string;

  @ApiProperty({
    description: 'Multimedia content related to the project (images, videos)',
    example: '[{ type: "image", url: "http://example.com/image.png" }, { type: "video", url: "http://example.com/video.mp4" }]',
  })
  @IsOptional()
  @IsArray({ message: 'Multimedia must be an array' })
  @ValidateNested({ each: true, message: 'Invalid multimedia data' })
  @Type(() => MultimediaDto)
  readonly multimedia?: MultimediaDto[];

  @ApiProperty({
    description: 'Document content related to the project (reports, contracts)',
    example: '[{ name: "Contract One", url: "http://example.com/doc.doc" }, { name: "Progress Report", url: "http://example.com/pdf.pdf" }]',
  })
  @IsOptional()
  @IsArray({ message: 'Document must be an array' })
  @ValidateNested({ each: true, message: 'Invalid document data' })
  @Type(() => DocumentDto)
  readonly documents?: DocumentDto[];

  @ApiProperty({
    description: 'Progress percentage of the project',
    example: 75,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Progress must be a number' })
  @Min(0, { message: 'Progress must be at least 0' })
  @Max(100, { message: 'Progress cannot exceed 100' })
  readonly progress?: number;

  @ApiProperty({
    description: 'Project partners or sponsors',
    example: '[{ name: "XYZ University", logoUrl: "http://example.com/logo.png" }]',
  })
  @IsOptional()
  @IsArray({ message: 'Partners must be an array' })
  @ValidateNested({ each: true, message: 'Invalid partner data' })
  @Type(() => PartnerDto)
  readonly partners?: PartnerDto[];

  @ApiProperty({
    description: 'Collaboration opportunities available for the project',
    example: '[{ expertise: "Microbiology", description: "Looking for a microbiologist to collaborate" }]',
  })
  @IsOptional()
  @IsArray({ message: 'Collaboration opportunities must be an array' })
  @ValidateNested({ each: true, message: 'Invalid collaboration opportunity data' })
  @Type(() => CollaborationOpportunityDto)
  readonly collaborationOpportunities?: CollaborationOpportunityDto[];

  @ApiProperty({
    description: 'Milestones or goals for the project',
    example: '[{ title: "Research Phase", completed: true }, { title: "Development Phase", completed: false }]',
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Milestones must be an array' })
  @ValidateNested({ each: true, message: 'Invalid milestone data' })
  @Type(() => MilestoneDto)
  readonly milestones?: MilestoneDto[];
}
