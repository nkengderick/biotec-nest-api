import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '../dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { SendEmailUseCase } from 'src/common/use-cases/send-email.use-case';

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly sendEmailUseCase: SendEmailUseCase, // Add email service
  ) {}

  async execute(signUpDto: SignUpDto) {
    try {
      // Check if the email is already in use
      const existingUser = await this.userRepository.findByEmail(
        signUpDto.email,
      );
      if (existingUser) {
        throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

      // Create the user
      const user = await this.userRepository.create({
        ...signUpDto,
        password_hash: hashedPassword,
      });

      // Generate JWT token
      const payload = { email: user.email, sub: user._id };
      const token = this.jwtService.sign(payload);

      // Send welcome email
      const templateData = {
        userName: user.first_name,
        userEmail: user.email,
        emailTitle: 'Welcome to BioTec Universe',
        profileUrl: `${process.env.FRONTEND_URL}/profile/edit-profile`,
        actionRequired: true,
        actionUrl: `${process.env.FRONTEND_URL}/profile/edit-profile`,
        actionText: 'Complete Your Profile',
        secondaryInfo:
          "Thank you for joining our community. We're excited to have you with us!",
      };

      try {
        await this.sendEmailUseCase.executeTemplated(
          user.email,
          'Welcome to BioTec Universe',
          'welcome-email',
          templateData,
        );
        console.log(`Welcome email sent to ${user.email}`);
      } catch (emailError) {
        console.error(
          `Failed to send welcome email to ${user.email}:`,
          emailError,
        );
      }

      return { access_token: token, user: user };
    } catch (error) {
      console.error('Sign-up process failed:', error); // Log the actual error

      // Mongoose-specific error handling (e.g., validation errors)
      if (error.name === 'ValidationError') {
        throw new HttpException(
          `Mongoose validation failed: ${error.message}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      // Check if it's a known HttpException
      if (error instanceof HttpException) {
        throw error;
      } else {
        // Log the unknown error details and throw the generic error
        throw new HttpException(
          'Something went wrong during the sign-up process',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
