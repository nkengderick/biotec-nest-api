import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  Matches,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  @ApiProperty({ description: 'Email address of the new user', type: String })
  readonly email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/(?=.*\d)(?=.*[A-Z])(?=.*\W)/, {
    message:
      'Password must contain at least one uppercase letter, one number, and one special character',
  })
  @ApiProperty({
    description: 'Password for the new user, minimum length is 6 characters',
    type: String,
  })
  readonly password: string;

  @IsNotEmpty({ message: 'First name cannot be empty' })
  @IsString({ message: 'First name must be a string' })
  @ApiProperty({ description: 'First name of the new user', type: String })
  readonly first_name: string;

  @IsNotEmpty({ message: 'Last name cannot be empty' })
  @IsString({ message: 'Last name must be a string' })
  @ApiProperty({ description: 'Last name of the new user', type: String })
  readonly last_name: string;

  @IsNotEmpty({ message: 'User type cannot be empty' })
  @IsIn(['admin', 'member', 'customer', 'applicant'], {
    message: 'User type must be one of: admin, member, customer, applicant',
  })
  @ApiProperty({
    description: 'Type of the user (admin, member, customer, or applicant)',
    type: String,
  })
  readonly user_type: string;

  @IsNotEmpty({ message: 'User category cannot be empty' })
  @IsIn(['student', 'professional', 'institutional', 'organizational'], {
    message:
      'User category must be one of: student, professional, institutional, organizational',
  })
  @ApiProperty({
    description:
      'Category of the user (student, professional, institutional, organizational)',
    type: String,
  })
  readonly user_category: string;
}
