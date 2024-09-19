import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { ChangePasswordDto } from '../dto/change-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ChangePasswordUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string, changePasswordDto: ChangePasswordDto) {
    // Find the user by ID
    const user = await this.userRepository.findById(userId);

    // Case 1: User not found
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Case 2: Old password is incorrect
    const isPasswordCorrect = await bcrypt.compare(
      changePasswordDto.old_password,
      user.password_hash,
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Old password is incorrect');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(
      changePasswordDto.new_password,
      10,
    );

    // Update the user's password in the repository
    return this.userRepository.update(userId, {
      password_hash: hashedPassword,
    });
  }
}
