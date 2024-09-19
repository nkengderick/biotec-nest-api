import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '../dto/sign-in.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(signInDto: SignInDto) {
    const user = await this.userRepository.findByEmail(signInDto.email);
    if (
      !user ||
      !(await bcrypt.compare(signInDto.password, user.password_hash))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
