import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsService } from './services/projects.service';
import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { UpdateProjectUseCase } from './use-cases/update-project.use-case';
import { DeleteProjectUseCase } from './use-cases/delete-project.use-case';
import { AssignMemberUseCase } from './use-cases/assign-member.use-case';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectRepository } from './repositories/project.repository';
import { ProjectMemberRepository } from './repositories/project-member.repository';
import { Project, ProjectSchema } from './schemas/project.schema';
import {
  ProjectMember,
  ProjectMemberSchema,
} from './schemas/project-member.schema';
import { GetAllProjectsUseCase } from './use-cases/get-all-projects.use-case';
import { MemberRepository } from '../user-management/repositories/member.repository';
import { Member, MemberSchema } from '../user-management/schemas/member.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }]),
    MongooseModule.forFeature([
      { name: ProjectMember.name, schema: ProjectMemberSchema },
    ]),
  ],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    CreateProjectUseCase,
    UpdateProjectUseCase,
    DeleteProjectUseCase,
    AssignMemberUseCase,
    GetAllProjectsUseCase,
    ProjectRepository,
    ProjectMemberRepository,
    MemberRepository,
  ],
})
export class ProjectsModule {}
