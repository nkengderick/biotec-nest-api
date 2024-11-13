import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ApplicantDocument = Applicant & Document;

@Schema({ timestamps: true })
export class Applicant {
  @ApiProperty({
    description: 'The ID of the user applying',
    example: '64fc8593b193c2b9aef76132',
  })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @ApiProperty({
    description: 'The motivation letter submitted by the applicant',
    example: 'I am passionate about this project because...',
  })
  @Prop({ type: String, required: true })
  motivation_letter: string;

  @ApiProperty({
    description: 'The ID of the member who referred the applicant (optional)',
    example: '64fc8593b193c2b9aef76133',
    required: false,
  })
  @Prop({ type: Types.ObjectId, ref: 'Member' })
  referred_by_member_id: Types.ObjectId;

  @ApiProperty({
    description: 'The current status of the application',
    example: 'pending',
    enum: ['pending', 'approved', 'rejected'],
  })
  @Prop({ enum: ['pending', 'approved', 'rejected'], default: 'pending' })
  application_status: string;

  @ApiProperty({
    description: 'The date the application was submitted',
    example: '2024-09-18T10:30:00.000Z',
  })
  @Prop({ type: Date, default: Date.now })
  applied_at: Date;

  @ApiProperty({
    description: 'The date the application was reviewed (optional)',
    example: '2024-09-22T10:30:00.000Z',
    required: false,
  })
  @Prop({ type: Date })
  reviewed_at: Date;

  @ApiProperty({
    description: 'The specialization area of the applicant (optional)',
    example: 'Data Science',
    required: false,
  })
  @Prop({ type: String })
  specialization_area: string;

  @ApiProperty({
    description: 'The URL to the applicant’s resume (optional)',
    example: 'http://example.com/resume.pdf',
    required: false,
  })
  @Prop({ type: String, required: false })
  resume_url: string;

  @ApiProperty({
    description: 'URL of the user’s profile photo (optional)',
    example: 'http://example.com/photo.png',
  })
  @Prop({ default: null })
  profile_photo_url: string;
}

export const ApplicantSchema = SchemaFactory.createForClass(Applicant);
