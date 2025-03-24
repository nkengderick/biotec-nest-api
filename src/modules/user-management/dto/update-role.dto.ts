import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { AssociationRole } from '../schemas/member-role.schema';

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID of the member to update the role for',
    type: String,
  })
  readonly member_id: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'New role to be assigned', enum: AssociationRole })
  readonly role: AssociationRole;
}