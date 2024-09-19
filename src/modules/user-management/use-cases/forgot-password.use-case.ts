import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { JwtService } from '@nestjs/jwt';
import { SendEmailUseCase } from 'src/common/use-cases/send-email.use-case';

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly sendEmailUseCase: SendEmailUseCase,
  ) {}

  async execute(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userRepository.findByEmail(forgotPasswordDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Generate a JWT token for password reset
    const payload = { sub: user._id, email: user.email };
    const resetToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });

    // Create a reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Send the reset link to the user's email
    const subject = 'Password Reset';
    const message = `Click the following link to reset your password: ${resetUrl}`;
    await this.sendEmailUseCase.execute(user.email, subject, message);

    return { message: 'Password reset instructions sent to your email' };
  }
}
