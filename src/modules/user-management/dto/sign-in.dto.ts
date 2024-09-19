import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Email address of the user', type: String })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Password of the user', type: String })
  readonly password: string;
}
