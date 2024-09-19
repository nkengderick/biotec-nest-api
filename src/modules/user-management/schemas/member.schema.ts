import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type MemberDocument = Member & Document;

@Schema({ timestamps: true })
export class Member {
  @ApiProperty({
    description: 'The ID of the user associated with this member profile',
    example: '64fc8593b193c2b9aef76132',
  })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @ApiProperty({
    description: 'A brief biography of the member',
    example: 'Experienced software engineer with a passion for AI...',
    required: false,
  })
  @Prop({ type: String })
  bio: string;

  @ApiProperty({
    description: 'The skills possessed by the member',
    example: ['JavaScript', 'NestJS', 'AI'],
    required: false,
  })
  @Prop({ type: [String] })
  skills: string[];

  @ApiProperty({
    description: 'The personal or professional interests of the member',
    example: ['Machine Learning', 'Blockchain', 'Startups'],
    required: false,
  })
  @Prop({ type: [String] })
  interests: string[];

  @ApiProperty({
    description: 'The specialization of the member',
    example: 'Software Engineering',
  })
  @Prop({ required: true })
  specialization: string;

  @ApiProperty({
    description: 'The address of the member',
    example: '123 Main St, City, Country',
    required: false,
  })
  @Prop({ type: String })
  address: string;

  @ApiProperty({
    description: 'The social media or professional network links of the member',
    example: ['https://linkedin.com/in/member', 'https://github.com/member'],
    required: false,
  })
  @Prop({ type: [String] })
  social_links: string[];

  @ApiProperty({
    description: 'URL to the member’s resume',
    example: 'http://example.com/resume.pdf',
    required: false,
  })
  @Prop({ type: String })
  resume_url: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
