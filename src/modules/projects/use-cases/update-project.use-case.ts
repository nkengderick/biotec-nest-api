import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { Project } from '../schemas/project.schema';

@Injectable()
export class UpdateProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    // Upsert array fields if they exist in the update DTO
    if (updateProjectDto.milestones) {
      project.milestones = this.upsertArray(
        project.milestones || [],
        updateProjectDto.milestones,
        'title', // assuming 'title' is the unique key for milestones
      );
    }

    if (updateProjectDto.multimedia) {
      project.multimedia = this.upsertArray(
        project.multimedia || [],
        updateProjectDto.multimedia,
        'url', // assuming 'url' is the unique key for multimedia
      );
    }

    if (updateProjectDto.partners) {
      project.partners = this.upsertArray(
        project.partners || [],
        updateProjectDto.partners,
        'name', // assuming 'name' is the unique key for partners
      );
    }

    if (updateProjectDto.collaborationOpportunities) {
      project.collaborationOpportunities = this.upsertArray(
        project.collaborationOpportunities || [],
        updateProjectDto.collaborationOpportunities,
        'expertise', // assuming 'expertise' is the unique key for collaboration opportunities
      );
    }

    // Update the project with the merged data
    return this.projectRepository.update(id, project);
  }

  // Helper function to handle upsert logic
  private upsertArray<T>(
    existingArray: T[],
    newArray: T[],
    uniqueKey: string,
  ): T[] {
    const map = new Map(existingArray.map((item) => [item[uniqueKey], item]));

    newArray.forEach((newItem) => {
      map.set(newItem[uniqueKey], {
        ...map.get(newItem[uniqueKey]),
        ...newItem,
      });
    });

    return Array.from(map.values());
  }
}
