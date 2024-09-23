import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Define sub-schema for social links
const SocialLinksSchema = {
  linkedin: {
    type: String,
    required: false,
    match: /^https?:\/\/(www\.)?linkedin\.com\/.+/,
  },
  twitter: {
    type: String,
    required: false,
    match: /^https?:\/\/(www\.)?twitter\.com\/.+/,
  },
  facebook: {
    type: String,
    required: false,
    match: /^https?:\/\/(www\.)?facebook\.com\/.+/,
  },
  instagram: {
    type: String,
    required: false,
    match: /^https?:\/\/(www\.)?instagram\.com\/.+/,
  },
};

// Define sub-schema for leadership team
const LeadershipTeamSchema = {
  member: { type: Types.ObjectId, required: true, ref: "Member"   }
};

// Define sub-schema for achievements
const AchievementsSchema = {
  title: { type: String, required: true },
  description: { type: String, required: false },
  date: { type: Date, required: false },
};

// Define sub-schema for partnnerships
const PartnershipsSchema = {
  partner: { type: String, required: true },
  description: { type: String, required: false },
  logo: { type: String, required: true },
  website: { type: String, required: false },
};

// Define sub-schema for videos/images/documents/appendices
const FileSchema = {
  url: { type: String, required: true, match: /^https?:\/\/.+/ },
  description: { type: String, required: false },
};

@Schema({ timestamps: true })
export class About extends Document {
  @ApiProperty({
    description: 'Name of the association',
    example: 'Biotech Universe',
  })
  @Prop({ required: true })
  name: string;

  @ApiPropertyOptional({
    description: 'Slogan of the association',
    example: 'Innovating the future of biotechnology.',
  })
  @Prop()
  slogan: string;

  @ApiPropertyOptional({
    description: 'URL of the logo image',
    example: 'https://example.com/logo.png',
  })
  @Prop()
  logo_url: string;

  @ApiPropertyOptional({
    description: 'URL of the cover photo',
    example: 'https://example.com/cover.png',
  })
  @Prop()
  cover_photo_url: string;

  @ApiProperty({
    description: 'Mission statement of the association',
    example: 'Our mission is to advance biotechnology.',
  })
  @Prop({ type: String })
  mission_statement: string;

  @ApiProperty({
    description: 'Vision statement of the association',
    example: 'We envision a world where biotech solves global problems.',
  })
  @Prop({ type: String })
  vision_statement: string;

  @ApiPropertyOptional({
    description: 'History or background of the association',
    example: 'Founded in 2021 with global presence.',
  })
  @Prop({ type: String })
  history: string;

  @ApiPropertyOptional({
    description: 'Contact email of the association',
    example: 'contact@biotechuniverse.com',
  })
  @Prop({ match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, required: false })
  contact_email: string;

  @ApiPropertyOptional({
    description: 'Contact phone number of the association',
    example: '+1-234-567-890',
  })
  @Prop({
    required: false,
  })
  contact_phone: string;

  @ApiPropertyOptional({
    description: 'Physical address of the association',
    example: '1234 Biotechnology Avenue, Science City, USA',
  })
  @Prop()
  address: string;

  @ApiPropertyOptional({
    description: 'Leadership team and their roles',
    example: [
      {
        name: 'John Doe',
        role: 'CEO',
        linkedin: 'https://linkedin.com/in/johndoe',
      },
    ],
  })
  @Prop({ type: [LeadershipTeamSchema], required: false })
  leadership_team: Record<string, any>[];

  @ApiPropertyOptional({
    description: 'Key achievements of the association',
    example: [
      {
        title: '1,000 members',
        description: 'Reached 1,000 members in 2023',
        date: '2023-01-01',
      },
    ],
  })
  @Prop({ type: [AchievementsSchema], required: false })
  achievements: Record<string, any>[];

  @ApiPropertyOptional({
    description: 'Information about partners or sponsors',
    example: [{ title: 'TechCorp', description: 'Partner since 2020', logo: 'https://via.placeholder.com/50.png?text=logo', wesite: 'https://mac-landing.vercel.com' }],
  })
  @Prop({ type: [PartnershipsSchema], required: false })
  partnerships: Record<string, any>[];

  @ApiPropertyOptional({
    description: 'Social media links of the association',
    example: {
      linkedin: 'https://linkedin.com/company/biotech',
      twitter: 'https://twitter.com/biotech',
    },
  })
  @Prop({ type: SocialLinksSchema, required: false })
  social_links: Record<string, any>;

  @ApiPropertyOptional({
    description: 'List of appendices or supplementary material',
    example: [
      {
        url: 'https://example.com/research.pdf',
        description: 'Research Paper',
      },
    ],
  })
  @Prop({ type: [FileSchema], required: false })
  appendices: Record<string, any>[];

  @ApiPropertyOptional({
    description: 'List of videos related to the association',
    example: [
      { url: 'https://example.com/video1.mp4', description: 'Promo Video' },
    ],
  })
  @Prop({ type: [FileSchema], required: false })
  videos: Record<string, any>[];

  @ApiPropertyOptional({
    description: 'List of images showcasing the association’s activities',
    example: [
      { url: 'https://example.com/image1.png', description: 'Event Image' },
    ],
  })
  @Prop({ type: [FileSchema], required: false })
  images: Record<string, any>[];

  @ApiPropertyOptional({
    description: 'List of important documents related to the association',
    example: [
      {
        url: 'https://example.com/document1.pdf',
        description: 'Policy Document',
      },
    ],
  })
  @Prop({ type: [FileSchema], required: false })
  documents: Record<string, any>[];

  @ApiPropertyOptional({
    description: 'Terms and conditions of the association',
    example: 'By using our services, you agree to the terms and conditions.',
  })
  @Prop({ type: String })
  terms_and_conditions: string;

  @ApiPropertyOptional({
    description: 'Privacy and security policies of the association',
    example: 'We prioritize your privacy and data security.',
  })
  @Prop({ type: String })
  privacy_policy: string;
}

export const AboutSchema = SchemaFactory.createForClass(About);
