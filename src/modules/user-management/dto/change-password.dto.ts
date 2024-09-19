import { IsString, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Old password', type: String })
  old_password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: 'New password, must be at least 8 characters long',
    type: String,
  })
  new_password: string;
}
