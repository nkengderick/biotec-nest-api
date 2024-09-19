import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { AssignMemberDto } from '../dto/assign-member.dto';
import { Project } from '../schemas/project.schema';
import { ProjectMember } from '../schemas/project-member.schema';
import { UpdateProjectUseCase } from '../use-cases/update-project.use-case';
import { CreateProjectUseCase } from '../use-cases/create-project.use-case';
import { DeleteProjectUseCase } from '../use-cases/delete-project.use-case';
import { AssignMemberUseCase } from '../use-cases/assign-member.use-case';
import { GetAllProjectsUseCase } from '../use-cases/get-all-projects.use-case';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly updateProjectUseCase: UpdateProjectUseCase,
    private readonly deleteProjectUseCase: DeleteProjectUseCase,
    private readonly assignMemberUseCase: AssignMemberUseCase,
    private readonly getAllProjectsUseCase: GetAllProjectsUseCase,
  ) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.createProjectUseCase.execute(createProjectDto);
  }

  async getAllProjects(): Promise<Project[]> {
    return this.getAllProjectsUseCase.execute();
  }

  async updateProject(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.updateProjectUseCase.execute(id, updateProjectDto);
  }

  async deleteProject(id: string): Promise<void> {
    return this.deleteProjectUseCase.execute(id);
  }

  async assignMember(assignMemberDto: AssignMemberDto): Promise<ProjectMember> {
    return this.assignMemberUseCase.execute(assignMemberDto);
  }
}
