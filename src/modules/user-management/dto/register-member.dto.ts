import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class RegisterMemberDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID of the user to register as a member',
    type: String,
  })
  readonly user_id: Types.ObjectId;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Biography of the member',
    type: String,
    required: false,
  })
  readonly bio: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({
    description: 'List of skills the member has',
    type: [String],
    required: false,
  })
  readonly skills: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({
    description: 'List of interests the member has',
    type: [String],
    required: false,
  })
  readonly interests: string[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Specialization area of the member',
    type: String,
  })
  readonly specialization: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Physical address of the member',
    type: String,
    required: false,
  })
  readonly address: string;

  @IsArray()
  @IsOptional()
  @IsUrl({}, { each: true })
  @ApiProperty({
    description: 'Social media profile URLs',
    type: [String],
    required: false,
  })
  readonly social_links: string[];

  @IsString()
  @IsOptional()
  @IsUrl()
  @ApiProperty({
    description: "URL of the member's resume",
    type: String,
    required: false,
  })
  readonly resume_url: string;
}
