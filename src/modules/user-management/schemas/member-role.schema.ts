import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Member } from './member.schema';
import { ApiProperty } from '@nestjs/swagger';

export type MemberRoleDocument = MemberRole & Document;

export enum AssociationRole {
  President = 'President',
  VicePresident = 'Vice President',
  Secretary = 'Secretary',
  Treasurer = 'Treasurer',
  CEO = 'CEO',
  Director = 'Director',
  Manager = 'Manager',
  Coordinator = 'Coordinator',
  Advisor = 'Advisor',
  Chairperson = 'Chairperson',
  BoardMember = 'Board Member',
  RegularMember = 'Regular Member',
  Volunteer = 'Volunteer',
  Patron = 'Patron',
  Auditor = 'Auditor',
  PublicRelationsOfficer = 'Public Relations Officer',
  EventCoordinator = 'Event Coordinator',
  TechnicalAdvisor = 'Technical Advisor',
  LegalAdvisor = 'Legal Advisor',
  FundraisingOfficer = 'Fundraising Officer',
  MembershipOfficer = 'Membership Officer',
  ProjectManager = 'Project Manager',
  Webmaster = 'Webmaster',
  Archivist = 'Archivist',
  LiaisonOfficer = 'Liaison Officer',
  Consultant = 'Consultant',
  Intern = 'Intern',
  Fellow = 'Fellow',
  HonoraryMember = 'Honorary Member',
  Trustee = 'Trustee',
  Delegate = 'Delegate',
  Observer = 'Observer',
  AssociateMember = 'Associate Member',
  WorkingGroupMember = 'Working Group Member',
  CommitteeMember = 'Committee Member',
  RegionalRepresentative = 'Regional Representative',
  NationalRepresentative = 'National Representative',
  InternationalRepresentative = 'International Representative',
  Spokesperson = 'Spokesperson',
  Facilitator = 'Facilitator',
}

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
    example: AssociationRole.President,
    enum: AssociationRole,
  })
  @Prop({
    enum: AssociationRole,
    required: true,
  })
  role: AssociationRole;

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
