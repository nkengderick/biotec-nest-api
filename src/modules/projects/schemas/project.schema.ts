import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @ApiProperty({
    description: 'The title of the project',
    example: 'Biotech Research Project',
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    description: 'Detailed description of the project',
    example: 'This project focuses on biotech innovations.',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    description: 'The start date of the project',
    example: '2024-09-18',
  })
  @Prop({ type: Date, default: Date.now })
  startDate: Date;

  @ApiProperty({
    description: 'The end date of the project',
    example: '2025-05-01',
    nullable: true,
    required: false,
  })
  @Prop({ type: Date, default: null })
  endDate: Date;

  @ApiProperty({
    description: 'The current status of the project',
    example: 'ongoing',
    enum: ['ongoing', 'completed'],
  })
  @Prop({ required: true, enum: ['ongoing', 'completed'], default: 'ongoing' })
  status: string;

  @ApiProperty({
    description: 'The category of the project (e.g., research, education)',
    example: 'research',
  })
  @Prop({ required: true })
  category: string;

  @ApiProperty({
    description: 'URL to the project image (Optional)',
    example: 'http://example.com/image.png',
    required: false,
  })
  @Prop({ type: String, default: null })
  projectImageUrl: string;

  @ApiProperty({
    description: 'The timestamp when the project was created',
    example: '2024-09-17T12:34:56.789Z',
  })
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the project was last updated',
    example: '2024-09-17T12:34:56.789Z',
  })
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
