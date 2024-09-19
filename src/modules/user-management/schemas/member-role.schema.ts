import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Member } from './member.schema';
import { ApiProperty } from '@nestjs/swagger';

export type MemberRoleDocument = MemberRole & Document;

@Schema({ timestamps: true })
export class MemberRole {
  @ApiProperty({
    description: 'The ID of the member to whom the role is assigned',
    example: '64fc8593b193c2b9aef76132',
  })
  @Prop({ type: Types.ObjectId, ref: 'Member', required: true })
  member_id: Types.ObjectId;

  @ApiProperty({
    description: 'The role assigned to the member',
    example: 'President',
    enum: ['President', 'Secretary', 'CEO', 'Regular'],
  })
  @Prop({
    enum: ['President', 'Secretary', 'CEO', 'Regular'],
    required: true,
  })
  role: string;

  @ApiProperty({
    description: 'The date when the role was assigned',
    example: '2024-09-18T10:30:00.000Z',
  })
  @Prop({ type: Date, default: Date.now })
  assigned_at: Date;

  @ApiProperty({
    description: 'The name or ID of the person who assigned the role',
    example: '64fc8593b193c2b9aef76133',
  })
  @Prop({ type: String, default: null })
  assigned_by: string;
}

export const MemberRoleSchema = SchemaFactory.createForClass(MemberRole);
