import {
  IsString,
  IsOptional,
  IsEmail,
  IsArray,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

// Leadership Team Class
class LeadershipTeamMember {
  @ApiProperty({
    description: 'Member Id of the leadership team member',
  })
  @IsMongoId({ message: 'member must be an Object ID.' })
  member: Types.ObjectId;
}

// Achievements Class
class Achievement {
  @ApiProperty({
    description: 'Title of the achievement or milestone',
    example: 'Reached 1,000 members in 2023',
  })
  @IsString({ message: 'Title must be a string.' })
  title: string;

  @ApiPropertyOptional({
    description: 'Description of the achievement',
    example: 'We successfully onboarded 1,000 members within the first year.',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  description?: string;

  @ApiPropertyOptional({
    description: 'Date the achievement was made',
    example: '2023-05-01',
  })
  @IsOptional()
  @IsString({ message: 'Date must be a valid string.' })
  date?: string;
}

// Partnerships Class
class Partnership {
  @ApiProperty({
    description: 'Partner name',
    example: 'TechCorp',
  })
  @IsString({ message: 'Partner name must be a string.' })
  partner: string;

  @ApiPropertyOptional({
    description: 'Description of the partnership',
    example: 'Partnered with TechCorp for research and development.',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  description?: string;
}

// Social Links Class
class SocialLink {
  @ApiPropertyOptional({
    description: 'Facebook link',
    example: 'https://facebook.com/biotechuniverse',
  })
  @IsOptional()
  @IsString({ message: 'Facebook link must be a valid URL.' })
  facebook?: string;

  @ApiPropertyOptional({
    description: 'LinkedIn link',
    example: 'https://linkedin.com/company/biotechuniverse',
  })
  @IsOptional()
  @IsString({ message: 'LinkedIn link must be a valid URL.' })
  linkedin?: string;

  @ApiPropertyOptional({
    description: 'Twitter link',
    example: 'https://twitter.com/biotechuniverse',
  })
  @IsOptional()
  @IsString({ message: 'Twitter link must be a valid URL.' })
  twitter?: string;
}

// File Class for Appendices, Videos, Images, Documents
class File {
  @ApiProperty({
    description: 'URL of the file',
    example: 'https://example.com/document.pdf',
  })
  @IsString({ message: 'URL must be a string.' })
  url: string;

  @ApiPropertyOptional({
    description: 'Description of the file',
    example: 'This is a document that outlines our policies.',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  description?: string;
}

export class CreateAboutDto {
  @ApiProperty({
    description: 'Name of the association',
    example: 'Biotech Universe',
  })
  @IsString({ message: 'Name must be a string.' })
  name: string;

  @ApiPropertyOptional({
    description: 'Slogan of the association',
    example: 'Innovating the future of biotechnology.',
  })
  @IsOptional()
  @IsString({ message: 'Slogan must be a string.' })
  slogan?: string;

  @ApiPropertyOptional({
    description: 'URL of the logo image',
    example: 'https://example.com/logo.png',
  })
  @IsOptional()
  @IsString({ message: 'Logo URL must be a string.' })
  logo_url?: string;

  @ApiPropertyOptional({
    description: 'URL of the cover photo',
    example: 'https://example.com/cover.png',
  })
  @IsOptional()
  @IsString({ message: 'Cover photo URL must be a string.' })
  cover_photo_url?: string;

  @ApiProperty({
    description: 'Mission statement of the association',
    example: 'Our mission is to advance the field of biotechnology.',
  })
  @IsString({ message: 'Mission statement must be a string.' })
  mission_statement: string;

  @ApiProperty({
    description: 'Vision statement of the association',
    example:
      'We envision a world where biotechnology solves global challenges.',
  })
  @IsString({ message: 'Vision statement must be a string.' })
  vision_statement: string;

  @ApiPropertyOptional({
    description: 'History or background of the association',
    example: 'Founded in 2021, we have grown into a global organization.',
  })
  @IsOptional()
  @IsString({ message: 'History must be a string.' })
  history?: string;

  @ApiPropertyOptional({
    description: 'Contact email of the association',
    example: 'contact@biotechuniverse.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Contact email must be a valid email address.' })
  contact_email?: string;

  @ApiPropertyOptional({
    description: 'Contact phone number of the association',
    example: '+1-234-567-890',
  })
  @IsOptional()
  @IsString({ message: 'Contact phone must be a string.' })
  contact_phone?: string;

  @ApiPropertyOptional({
    description: 'Physical address of the association',
    example: '1234 Biotechnology Avenue, Science City, USA',
  })
  @IsOptional()
  @IsString({ message: 'Address must be a string.' })
  address?: string;

  @ApiPropertyOptional({
    description: 'Leadership team and their roles',
    type: [LeadershipTeamMember],
    example: [
      {
        name: 'John Doe',
        role: 'CEO',
        linkedin: 'https://linkedin.com/in/johndoe',
      },
      {
        name: 'Jane Smith',
        role: 'CFO',
        linkedin: 'https://linkedin.com/in/janesmith',
      },
    ],
  })
  @IsOptional()
  @IsArray({ message: 'Leadership team must be an array.' })
  @ValidateNested({ each: true })
  @Type(() => LeadershipTeamMember)
  leadership_team?: LeadershipTeamMember[];

  @ApiPropertyOptional({
    description: 'Key achievements of the association',
    type: [Achievement],
    example: [
      {
        title: 'Reached 1,000 members in 2023',
        description: 'We successfully onboarded 1,000 members.',
      },
      { title: 'Hosted the biggest biotech event in 2022' },
    ],
  })
  @IsOptional()
  @IsArray({ message: 'Achievements must be an array.' })
  @ValidateNested({ each: true })
  @Type(() => Achievement)
  achievements?: Achievement[];

  @ApiPropertyOptional({
    description: 'Partnerships and sponsorships',
    type: [Partnership],
    example: [{ partner: 'TechCorp', description: 'Research collaboration' }],
  })
  @IsOptional()
  @IsArray({ message: 'Partnerships must be an array.' })
  @ValidateNested({ each: true })
  @Type(() => Partnership)
  partnerships?: Partnership[];

  @ApiPropertyOptional({
    description: 'Social media links of the association',
    type: SocialLink,
    example: { linkedin: 'https://linkedin.com/company/biotechuniverse' },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialLink)
  social_links?: SocialLink;

  @ApiPropertyOptional({
    description: 'List of appendices or supplementary material',
    type: [File],
    example: [
      {
        url: 'https://example.com/appendix1.pdf',
        description: 'Research Paper',
      },
    ],
  })
  @IsOptional()
  @IsArray({ message: 'Appendices must be an array.' })
  @ValidateNested({ each: true })
  @Type(() => File)
  appendices?: File[];

  @ApiPropertyOptional({
    description: 'List of videos related to the association',
    type: [File],
    example: [
      {
        url: 'https://example.com/video1.mp4',
        description: 'Introduction video',
      },
    ],
  })
  @IsOptional()
  @IsArray({ message: 'Videos must be an array.' })
  @ValidateNested({ each: true })
  @Type(() => File)
  videos?: File[];

  @ApiPropertyOptional({
    description: 'List of images showcasing the association’s activities',
    type: [File],
    example: [
      {
        url: 'https://example.com/image1.png',
        description: 'Conference image',
      },
    ],
  })
  @IsOptional()
  @IsArray({ message: 'Images must be an array.' })
  @ValidateNested({ each: true })
  @Type(() => File)
  images?: File[];

  @ApiPropertyOptional({
    description: 'List of important documents related to the association',
    type: [File],
    example: [
      {
        url: 'https://example.com/document1.pdf',
        description: 'Official policy document',
      },
    ],
  })
  @IsOptional()
  @IsArray({ message: 'Documents must be an array.' })
  @ValidateNested({ each: true })
  @Type(() => File)
  documents?: File[];

  @ApiPropertyOptional({
    description: 'Terms and conditions of the association',
    example: 'By using our services, you agree to the terms and conditions.',
  })
  @IsOptional()
  @IsString({ message: 'Terms and conditions must be a string.' })
  terms_and_conditions?: string;

  @ApiPropertyOptional({
    description: 'Privacy and security policies of the association',
    example: 'Your data is secure and private according to our policy.',
  })
  @IsOptional()
  @IsString({ message: 'Privacy policy must be a string.' })
  privacy_policy?: string;
}
