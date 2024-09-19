import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { ProjectMemberRepository } from '../repositories/project-member.repository';
import { Project, ProjectDocument } from '../schemas/project.schema';
import { ProjectMember } from '../schemas/project-member.schema';

@Injectable()
export class GetAllProjectsUseCase {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly projectMemberRepository: ProjectMemberRepository,
  ) {}

  async execute(): Promise<(Project & { members: ProjectMember[] })[]> {
    // Fetch all projects
    const projects = await this.projectRepository.findAll();

    // Fetch all project members and map them to their projects
    const projectMembers = await Promise.all(
      projects.map((project: ProjectDocument) =>
        this.projectMemberRepository.findMembersByProject(
          project._id.toString(),
        ),
      ),
    );

    // Attach members to their respective projects
    return projects.map((project: ProjectDocument, index: number) => ({
      ...project.toObject(),
      members: projectMembers[index],
    }));
  }
}
