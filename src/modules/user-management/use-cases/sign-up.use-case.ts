import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '../dto/sign-up.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
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

      return { access_token: token };
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
