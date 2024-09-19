import { Injectable } from '@nestjs/common';
import { MemberRepository } from '../repositories/member.repository';
import { RegisterMemberDto } from '../dto/register-member.dto';

@Injectable()
export class RegisterMemberUseCase {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute(registerMemberDto: RegisterMemberDto) {
    return this.memberRepository.create(registerMemberDto);
  }
}
