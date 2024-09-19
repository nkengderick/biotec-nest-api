import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { AssignMemberDto } from '../dto/assign-member.dto';
import { Project } from '../schemas/project.schema';
import { ProjectMember } from '../schemas/project-member.schema';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiBody({
    type: CreateProjectDto,
    description: 'The data needed to create a project',
  })
  @ApiResponse({
    status: 201,
    description: 'Project successfully created',
    type: Project,
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    return this.projectsService.createProject(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({
    status: 200,
    description: 'List of all projects',
    type: [Project],
  })
  @ApiResponse({ status: 400, description: 'Error retrieving projects' })
  async getAllProjects(): Promise<Project[]> {
    return this.projectsService.getAllProjects();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing project' })
  @ApiParam({ name: 'id', description: 'The ID of the project to update' })
  @ApiBody({
    type: UpdateProjectDto,
    description: 'The data to update the project with',
  })
  @ApiResponse({
    status: 200,
    description: 'Project successfully updated',
    type: Project,
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectsService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the project to delete' })
  @ApiResponse({ status: 200, description: 'Project successfully deleted' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async deleteProject(@Param('id') id: string): Promise<void> {
    return this.projectsService.deleteProject(id);
  }

  @Post('assign-member')
  @ApiOperation({ summary: 'Assign a member to a project' })
  @ApiBody({
    type: AssignMemberDto,
    description: 'Data to assign a member to the project',
  })
  @ApiResponse({
    status: 201,
    description: 'Member successfully assigned to the project',
    type: ProjectMember,
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  async assignMember(
    @Body() assignMemberDto: AssignMemberDto,
  ): Promise<ProjectMember> {
    return this.projectsService.assignMember(assignMemberDto);
  }
}
