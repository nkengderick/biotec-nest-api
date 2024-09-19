import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class AssignRoleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID of the member to whom the role is assigned',
    type: String,
  })
  readonly member_id: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Role to be assigned', type: String })
  readonly role: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID of the person assigning the role',
    type: String,
  })
  readonly assigned_by: string;
}
