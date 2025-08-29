import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { AssociationRole } from './member-role.schema';

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

  @ApiProperty({
    description: 'URL of the user’s profile photo (optional)',
    example: 'http://example.com/photo.png',
  })
  @Prop({ default: null })
  profile_photo_url: string;

  @ApiProperty({
    description: 'The role assigned to the member',
    example: AssociationRole.President,
    enum: AssociationRole,
  })
  @Prop({
    enum: AssociationRole,
    required: true,
    default: AssociationRole.RegularMember,
  })
  role: AssociationRole;

  @ApiProperty({
    description:
      'Unique member ID following format BTU[YY][MM][Type][TypeSeq][MemberSeq]',
    example: 'BTU2512P0305',
    required: true,
  })
  @Prop({ type: String, unique: true })
  memberid: string;

  @ApiProperty({
    description: 'Whether a membership card has been issued for this member',
    example: false,
    required: false,
  })
  @Prop({ type: Boolean, default: false })
  cardissued: boolean;

  @ApiProperty({
    description: 'Date when the membership card was issued',
    example: '2025-01-15T10:30:00Z',
    required: false,
  })
  @Prop({ type: Date })
  cardissuedat: Date;

  @ApiProperty({
    description: 'URL to the membership card PDF',
    example: 'https://example.com/cards/BTU2512P0305.pdf',
    required: false,
  })
  @Prop({ type: String })
  cardpdfurl: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
