import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { AssociationRole } from '../schemas/member-role.schema';

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
  @ApiProperty({ description: 'Role to be assigned', enum: AssociationRole })
  readonly role: AssociationRole;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID of the person assigning the role',
    type: String,
  })
  readonly assigned_by: string;
}
