import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: '64fc8593b193c2b9aef76132',
  })
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @ApiProperty({
    description: 'Unique email address of the user',
    example: 'john.doe@example.com',
  })
  @Prop({ unique: true, required: true })
  email: string;

  @ApiProperty({
    description: 'Hashed password of the user',
    example: 'hashedpassword123',
  })
  @Prop({ required: true })
  password_hash: string;

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  @Prop({ required: true })
  first_name: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
  })
  @Prop({ required: true })
  last_name: string;

  @ApiProperty({
    description: 'Type of user in the system',
    example: 'admin',
    enum: ['admin', 'member', 'customer', 'applicant'],
  })
  @Prop({ required: true, enum: ['admin', 'member', 'customer', 'applicant'] })
  user_type: string;

  @ApiProperty({
    description: 'Type of user application',
    example: 'student',
    enum: ['student', 'professional', 'institutional', 'organizational'],
    default: 'student',
  })
  @Prop({ required: true, enum: ['student', 'professional', 'institutional', 'organizational'] })
  user_category: string;

  @ApiProperty({
    description: 'Date the user account was created',
    example: '2024-09-18T12:34:56.789Z',
    default: 'created date',
  })
  @Prop({ default: Date.now })
  created_at: Date | null;

  @ApiProperty({
    description: 'Date the user account was last updated',
    example: '2024-09-18T12:34:56.789Z',
    default: 'created date',
  })
  @Prop({ default: Date.now })
  updated_at: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
