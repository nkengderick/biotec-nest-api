import { Injectable } from '@nestjs/common';
import { MemberRepository } from '../repositories/member.repository';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Injectable()
export class UpdateProfileUseCase {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute(updateProfileDto: UpdateProfileDto) {
    return this.memberRepository.update(
      updateProfileDto.member_id,
      updateProfileDto,
    );
  }
}
