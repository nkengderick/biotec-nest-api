import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignMemberDto {
  @ApiProperty({
    description: 'The ID of the project',
    example: '6149fcf09b2e45b9a5f8e589',
  })
  @IsNotEmpty({ message: 'Project ID should not be empty' })
  @IsString({ message: 'Project ID must be a string' })
  readonly projectId: string;

  @ApiProperty({
    description: 'The ID of the member to be assigned',
    example: '6151e4a20d5d45ccaa8e688e',
  })
  @IsNotEmpty({ message: 'Member ID should not be empty' })
  @IsString({ message: 'Member ID must be a string' })
  readonly memberId: string;

  @ApiProperty({
    description: 'The role of the member in the project',
    example: 'Project Lead',
  })
  @IsNotEmpty({ message: 'Role in project should not be empty' })
  @IsString({ message: 'Role in project must be a string' })
  readonly roleInProject: string;
}
