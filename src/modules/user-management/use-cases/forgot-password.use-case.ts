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

    // Prepare the subject and content of the email
    const subject = 'Password Reset Request';

    const htmlContent = `
    <p>Dear ${user.first_name},</p>
    <p>We have received a request to reset the password for your account. If you did not initiate this request, please disregard this email.</p>
    <p>To proceed with resetting your password, please click the button below:</p>
    <p style="text-align: center;">
      <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Reset Your Password</a>
    </p>
    <p>If you encounter any issues or require further assistance, please do not hesitate to contact our support team.</p>
    <p>Best regards,</p>
    <p>BioTec Universe Service Team</p>
    `;

    // Prepare a plain text version as a fallback
    const textContent = `
    Dear ${user.first_name},

    We have received a request to reset the password for your account. If you did not initiate this request, please disregard this email.

    To proceed with resetting your password, please use the following link:

    ${resetUrl}

    If you encounter any issues or require further assistance, please do not hesitate to contact our support team.

    Best regards,  
    BioTec Universe Service Team
    `;

    // Send the email with HTML and plain text content
    await this.sendEmailUseCase.execute(
      user.email,
      subject,
      textContent,
      htmlContent,
    );

    return { message: 'Password reset instructions sent to your email' };
  }
}
