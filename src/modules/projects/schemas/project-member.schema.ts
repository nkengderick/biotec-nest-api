import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Member } from '../../user-management/schemas/member.schema';
import { Project } from './project.schema';

export type ProjectMemberDocument = ProjectMember & Document;

@Schema()
export class ProjectMember {
  @ApiProperty({
    description: 'The ID of the project that the member is assigned to',
    example: '61234567890abcdef1234567',
  })
  @Prop({ type: Types.ObjectId, ref: Project.name, required: true })
  projectId: Project;

  @ApiProperty({
    description: 'The ID of the member assigned to the project',
    example: '61234567890abcdef1234567',
  })
  @Prop({ type: Types.ObjectId, ref: Member.name, required: true })
  memberId: Member;

  @ApiProperty({
    description: 'The role of the member within the project',
    example: 'Project Manager',
  })
  @Prop({ required: true })
  roleInProject: string;

  @ApiProperty({
    description: 'The date when the member joined the project',
    example: '2024-09-17T12:34:56.789Z',
  })
  @Prop({ type: Date, default: Date.now })
  joinedAt: Date;
}

export const ProjectMemberSchema = SchemaFactory.createForClass(ProjectMember);
