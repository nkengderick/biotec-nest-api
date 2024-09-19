import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from '../schemas/project.schema';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  // Create a new project
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  // Find all projects
  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  // Find a project by its ID
  async findById(id: string): Promise<Project> {
    return this.projectModel.findById(id).exec();
  }

  // Update a project
  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, {
        new: true,
      })
      .exec();
  }

  // Delete a project
  async delete(id: string): Promise<Project> {
    return this.projectModel.findByIdAndDelete(id).exec();
  }
}
