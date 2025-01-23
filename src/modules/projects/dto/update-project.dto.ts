import { IsOptional, IsString, IsDate, IsEnum, IsUrl } from 'class-validator';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CollaborationOpportunityDto, CreateProjectDto, DocumentDto, MilestoneDto, MultimediaDto, PartnerDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiPropertyOptional({
    description: 'The title of the project',
    example: 'Updated Project Title',
  })
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  readonly title?: string;

  @ApiPropertyOptional({
    description: 'A short summary of the project',
    example: 'This project focuses on biotech innovations.',
  })
  @IsString({ message: 'Summary must be a string' })
  readonly summary?: string;

  @ApiPropertyOptional({
    description: 'Detailed description of the project',
    example: '<p>This project focuses on biotech innovations...</p>',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  readonly description?: string;

  @ApiPropertyOptional({
    description: 'Start date of the project',
    example: '2024-09-18',
  })
  @IsOptional()
  @IsDate({ message: 'Start date must be a valid date' })
  readonly startDate?: Date;

  @ApiPropertyOptional({
    description: 'End date of the project',
    example: '2025-05-01',
  })
  @IsOptional()
  @IsDate({ message: 'End date must be a valid date' })
  readonly endDate?: Date;

  @ApiPropertyOptional({
    description: 'Current status of the project',
    example: 'completed',
    enum: ['ongoing', 'completed', 'upcoming'],
  })
  @IsOptional()
  @IsEnum(['ongoing', 'completed', 'upcoming'], {
    message: 'Status must be either ongoing, upcoming or completed',
  })
  readonly status?: 'ongoing' | 'completed' | 'upcoming';

  @ApiPropertyOptional({
    description: 'Category of the project (e.g., research, education)',
    example: 'education',
  })
  @IsOptional()
  @IsString({ message: 'Category must be a string' })
  readonly category?: string;

  @ApiPropertyOptional({
    description: 'URL to the project image',
    example: 'http://example.com/image.png',
  })
  @IsOptional()
  @IsUrl({}, { message: 'Project image must be a valid URL' })
  readonly projectImageUrl?: string;

  @ApiPropertyOptional({
    description: 'Multimedia content related to the project (images, videos)',
    example: '[{ type: "image", url: "http://example.com/image.png" }, { type: "video", url: "http://example.com/video.mp4" }]',
  })
  multimedia?: MultimediaDto[];
  
  @ApiPropertyOptional({
    description: 'Multimedia content related to the project (contracts, reports)',
    example: '[{ name: "Report One", url: "http://example.com/pdf.pdf" }, { type: "video", url: "http://example.com/video.mp4" }]',
  })
  documents?: DocumentDto[];

  @ApiPropertyOptional({
    description: 'Progress percentage of the project',
    example: 75,
  })
  progress?: number;

  @ApiPropertyOptional({
    description: 'Project partners or sponsors',
    example: '[{ name: "XYZ University", logoUrl: "http://example.com/logo.png" }]',
  })
  partners?: PartnerDto[];

  @ApiPropertyOptional({
    description: 'Collaboration opportunities available for the project',
    example: '[{ expertise: "Microbiology", description: "Looking for a microbiologist to collaborate" }]',
  })
  collaborationOpportunities?: CollaborationOpportunityDto[];

  @ApiPropertyOptional({
    description: 'Milestones or goals for the project',
    example: '[{ title: "Research Phase", completed: true }, { title: "Development Phase", completed: false }]',
  })
  milestones?: MilestoneDto[];
}
