import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsUrl,
  IsEnum,
  IsMongoId,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { AssociationRole } from '../schemas/member-role.schema';
import { Applicant } from '../schemas/applicant.schema';

export class RegisterMemberDto {
  @IsNotEmpty({ message: 'User ID cannot be empty' })
  @IsString({ message: 'User ID must be a string' })
  @IsMongoId({ message: 'User ID must be a valid MongoDB ObjectId' })
  @ApiProperty({ description: 'ID of the user applying', type: String })
  readonly user_id: Types.ObjectId;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Biography of the member',
    type: String,
    required: false,
  })
  bio: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({
    description: 'List of skills the member has',
    type: [String],
    required: false,
  })
  skills: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({
    description: 'List of interests the member has',
    type: [String],
    required: false,
  })
  interests: string[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Specialization area of the member',
    type: String,
  })
  specialization: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Physical address of the member',
    type: String,
    required: false,
  })
  address: string;

  @IsArray()
  @IsOptional()
  @IsUrl({}, { each: true })
  @ApiProperty({
    description: 'Social media profile URLs',
    type: [String],
    required: false,
  })
  social_links: string[];

  @IsString()
  @IsOptional()
  @IsUrl()
  @ApiProperty({
    description: "URL of the member's resume",
    type: String,
    required: false,
  })
  resume_url: string;

  @IsString({ message: 'Profile Photo url must be a string' })
  @ApiProperty({ description: 'Profile Photo of the new user', type: String })
  profile_photo_url: string;

  @IsNotEmpty()
  @IsEnum({
    enum: AssociationRole,
    message: 'Role must be a valid Association Role',
  })
  @ApiProperty({
    description: 'The role assigned to the member',
    example: AssociationRole.President,
    enum: AssociationRole,
  })
  role: AssociationRole;

  constructor(data: Partial<RegisterMemberDto>) {
    Object.assign(this, data);
  }

  static fromApplicant(applicant: Applicant): RegisterMemberDto {
    return new RegisterMemberDto({
      user_id: applicant.user_id,
      bio: applicant.motivation_letter,
      skills: null,
      interests: null,
      specialization: applicant.specialization_area,
      address: null,
      social_links: null,
      resume_url: applicant.resume_url,
      profile_photo_url: applicant.profile_photo_url,
      role: AssociationRole.RegularMember,
    });
  }
}
