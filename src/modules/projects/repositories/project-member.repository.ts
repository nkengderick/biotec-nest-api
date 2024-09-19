import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ProjectMember,
  ProjectMemberDocument,
} from '../schemas/project-member.schema';
import { AssignMemberDto } from '../dto/assign-member.dto';

@Injectable()
export class ProjectMemberRepository {
  constructor(
    @InjectModel(ProjectMember.name)
    private projectMemberModel: Model<ProjectMemberDocument>,
  ) {}

  // Assign a member to a project
  async assignMember(assignMemberDto: AssignMemberDto): Promise<ProjectMember> {
    const projectMember = new this.projectMemberModel(assignMemberDto);
    return projectMember.save();
  }

  // Find all members of a project
  async findMembersByProject(projectId: string): Promise<ProjectMember[]> {
    return this.projectMemberModel
      .find({ projectId })
      .populate('memberId')
      .exec();
  }

  // Find all projects a member is involved in
  async findProjectsByMember(memberId: string): Promise<ProjectMember[]> {
    return this.projectMemberModel
      .find({ memberId })
      .populate('projectId')
      .exec();
  }

  // Remove a member from a project
  async removeMemberFromProject(
    projectId: string,
    memberId: string,
  ): Promise<ProjectMember> {
    return this.projectMemberModel
      .findOneAndDelete({ projectId, memberId })
      .exec();
  }
}
