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
    description: 'Short summary of the project',
    example: 'This project focuses on biotech innovations.',
  })
  @Prop({ required: true })
  summary: string;

  @ApiProperty({
    description: 'Detailed description of the project, can include HTML content.',
    example: '<p>This project focuses on biotech innovations...</p>',
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
  status: 'ongoing' | 'completed';

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
    description: 'Multimedia content related to the project (images, videos)',
    example: '[{ type: "image", url: "http://example.com/image.png" }, { type: "video", url: "http://example.com/video.mp4" }]',
    required: false,
  })
  @Prop({ type: [{ type: Object }], default: [] })
  multimedia: { type: string; url: string }[];
  @ApiProperty({
    description: 'Documents related to the project (pdf, word)',
    example: '[{ name: "Project Initiation Document", url: "http://example.com/doc.doc" }, { name: "Progress Report", url: "http://example.com/pdf.pdf" }]',
    required: false,
  })
  @Prop({ type: [{ type: Object }], default: [] })
  documents: { name: string; url: string }[];

  @ApiProperty({
    description: 'Progress percentage of the project',
    example: 75,
    required: false,
  })
  @Prop({ type: Number, default: 0 })
  progress: number;

  @ApiProperty({
    description: 'Project partners or sponsors',
    example: '[{ name: "XYZ University", logoUrl: "http://example.com/logo.png" }]',
    required: false,
  })
  @Prop({ type: [{ name: String, logoUrl: String }], default: [] })
  partners: { name: string; logoUrl?: string }[];

  @ApiProperty({
    description: 'Collaboration opportunities available for the project',
    example: '[{ expertise: "Microbiology", description: "Looking for a microbiologist to collaborate" }]',
    required: false,
  })
  @Prop({ type: [{ expertise: String, description: String }], default: [] })
  collaborationOpportunities: { expertise: string; description: string }[];

    @ApiProperty({
    description: 'Milestones or goals for the project',
    example: '[{ title: "Research Phase", completed: true }, { title: "Development Phase", completed: false }]',
    required: false,
  })
  @Prop({ type: [{ title: String, completed: Boolean }], default: [] })
  milestones: { title: string; completed: boolean }[];

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
