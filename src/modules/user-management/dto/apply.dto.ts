import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUrl,
  IsMongoId,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class ApplyDto {
  @IsNotEmpty({ message: 'User ID cannot be empty' })
  @IsString({ message: 'User ID must be a string' })
  @IsMongoId({ message: 'User ID must be a valid MongoDB ObjectId' })
  @ApiProperty({ description: 'ID of the user applying', type: String })
  readonly user_id: Types.ObjectId;

  @IsNotEmpty({ message: 'Motivation letter cannot be empty' })
  @IsString({ message: 'Motivation letter must be a string' })
  @ApiProperty({
    description: 'Motivation letter for the application',
    type: String,
  })
  readonly motivation_letter: string;

  @IsOptional()
  @IsString({ message: 'Referred by member ID must be a string' })
  @IsMongoId({
    message: 'Referred by member ID must be a valid MongoDB ObjectId',
  })
  @ApiProperty({
    description: 'ID of the member who referred the applicant',
    type: String,
    required: false,
  })
  readonly referred_by_member_id?: Types.ObjectId;

  @IsNotEmpty({ message: 'Specialization area cannot be empty' })
  @IsString({ message: 'Specialization area must be a string' })
  @ApiProperty({
    description: 'Specialization area of the applicant',
    type: String,
  })
  readonly specialization_area: string;

  @IsOptional()
  @IsString({ message: 'Resume URL must be a string' })
  @IsUrl({}, { message: 'Resume URL must be a valid URL' })
  @ApiProperty({
    description: "URL of the applicant's resume",
    type: String,
    required: false,
  })
  readonly resume_url?: string;
}
