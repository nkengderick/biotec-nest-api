import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { ProjectMemberRepository } from '../repositories/project-member.repository';
import { AssignMemberDto } from '../dto/assign-member.dto';
import { ProjectMember } from '../schemas/project-member.schema';
import { MemberRepository } from 'src/modules/user-management/repositories/member.repository';

@Injectable()
export class AssignMemberUseCase {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly projectMemberRepository: ProjectMemberRepository,
    private readonly memberRepository: MemberRepository,
  ) {}

  async execute(assignMemberDto: AssignMemberDto): Promise<ProjectMember> {
    const { projectId, memberId } = assignMemberDto;

    // Check if project exists
    const project = await this.projectRepository.findById(projectId);
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Check if member exists
    const member = await this.memberRepository.findById(memberId);
    if (!member) {
      throw new NotFoundException(`Member with ID ${memberId} not found`);
    }

    // Assign member to the project
    const assignedMember =
      await this.projectMemberRepository.assignMember(assignMemberDto);
    if (!assignedMember) {
      throw new NotFoundException(
        `Cannot assign member ${memberId} to project ${projectId}`,
      );
    }
    return assignedMember;
  }
}
