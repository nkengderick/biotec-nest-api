import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(resetPasswordDto: ResetPasswordDto) {
    const hashedPassword = await bcrypt.hash(resetPasswordDto.new_password, 10);

    // Verify the JWT token
    let payload;
    try {
      payload = this.jwtService.verify(resetPasswordDto.token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      throw new BadRequestException('Invalid or expired token');
    }

    // Extract the user ID from the token's payload
    const userId = payload.sub;
    console.log(userId, "===" , resetPasswordDto.userId)

    // Find the user by the extracted user ID
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Hash the new password
    const passwordHash = await bcrypt.hash(resetPasswordDto.new_password, 10);

    // Use the repository to update the password hash
    await this.userRepository.update(userId, { password_hash: passwordHash });

    return { message: 'Password reset successfully' };
  }
}
