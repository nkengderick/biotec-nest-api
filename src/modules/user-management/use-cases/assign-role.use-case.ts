import { Injectable } from '@nestjs/common';
import { MemberRoleRepository } from '../repositories/member-role.repository';
import { AssignRoleDto } from '../dto/assign-role.dto';

@Injectable()
export class AssignRoleUseCase {
  constructor(private readonly memberRoleRepository: MemberRoleRepository) {}

  async execute(assignRoleDto: AssignRoleDto) {
    return this.memberRoleRepository.create(assignRoleDto);
  }
}
