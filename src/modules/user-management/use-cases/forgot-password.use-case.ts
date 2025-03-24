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
      expiresIn: '1h', // The token expires in 1 hour
    });

    // Create a reset URL with the token
    const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password/${resetToken}`;

    // Prepare the email data using the template
    const templateData = {
      userName: user.first_name,
      userEmail: user.email,
      emailTitle: 'Password Reset Request',
      resetUrl: resetUrl,
      actionRequired: true,
      actionUrl: resetUrl,
      actionText: 'Reset Your Password',
      secondaryInfo:
        'If you did not request a password reset, you can safely ignore this email. Your account is secure.',
    };

    // Send the email using the template
    await this.sendEmailUseCase.executeTemplated(
      user.email,
      'Password Reset Request',
      'reset-password',
      templateData,
    );

    return { message: 'Password reset instructions sent to your email' };
  }
}
