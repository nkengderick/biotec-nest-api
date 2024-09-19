import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Token for resetting the password',
    type: String,
  })
  token: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User ID associated with the password reset',
    type: String,
  })
  userId: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @ApiProperty({
    description: 'New password to set, must be at least 8 characters long',
    type: String,
  })
  new_password: string;
}
