import { IsString, IsNotEmpty, MinLength, IsEmail, IsMongoId, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Token for resetting the password',
    type: String,
  })
  token: string;

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User ID associated with the password reset',
    type: String,
  })
  userId: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/(?=.*\d)(?=.*[A-Z])(?=.*\W)/, {
    message:
      'Password must contain at least one uppercase letter, one number, and one special character',
  })
  @IsNotEmpty()
  @ApiProperty({
    description: 'New password to set, must be at least 6 characters long',
    type: String,
  })
  new_password: string;
}
