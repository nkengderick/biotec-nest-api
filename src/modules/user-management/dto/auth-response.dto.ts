import { ApiProperty } from '@nestjs/swagger';
import { User } from '../schemas/user.schema';

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT access token for the authenticated user',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({
    description: 'User object containing user details',
    type: User, // Reference to the User entity or DTO
  })
  user: User; // This should be a reference to the User class or DTO
}
