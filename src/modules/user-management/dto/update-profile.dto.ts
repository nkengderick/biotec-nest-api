import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID of the member to update the profile for',
    type: String,
  })
  readonly member_id: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Biography of the member',
    type: String,
    required: false,
  })
  readonly bio?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'List of skills',
    type: [String],
    required: false,
  })
  readonly skills?: string[];

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Specialization of the member',
    type: String,
    required: false,
  })
  readonly specialization?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Address of the member',
    type: String,
    required: false,
  })
  readonly address?: string;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  @ApiProperty({
    description: 'Social media links of the member',
    type: [String],
    required: false,
  })
  readonly social_links?: string[];

  @IsOptional()
  @IsString()
  @IsUrl()
  @ApiProperty({
    description: 'Resume URL of the member',
    type: String,
    required: false,
  })
  readonly resume_url?: string;
}
