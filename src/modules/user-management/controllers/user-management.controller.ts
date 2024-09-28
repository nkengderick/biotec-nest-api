import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  HttpCode,
  HttpStatus,
  Patch,
  Get,
} from '@nestjs/common';
import { UserManagementService } from '../services/user-management.service';

// DTOs
import { ApplyDto } from '../dto/apply.dto';
import { AssignRoleDto } from '../dto/assign-role.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { RegisterMemberDto } from '../dto/register-member.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { UpdateSettingsDto } from '../dto/update-user-settings.dto';

// Swagger Decorators
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { User } from '../schemas/user.schema';
import { AuthResponseDto } from '../dto/auth-response.dto';

@ApiTags('User Management') // Grouping for Swagger
@Controller('auth')
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) {}

  // ---------- Authentication Routes ----------

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 201, description: 'User successfully signed up', type: AuthResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.userManagementService.signUp(signUpDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: 200, description: 'User successfully signed in', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async signIn(@Body() signInDto: SignInDto) {
    return this.userManagementService.signIn(signInDto);
  }

  // ---------- Password Management Routes ----------

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send forgot password email' })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({ status: 200, description: 'Password reset email sent' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.userManagementService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset user password' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ status: 200, description: 'Password successfully reset' })
  @ApiResponse({ status: 400, description: 'Invalid token or data' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.userManagementService.resetPassword(resetPasswordDto);
  }

  @Patch('change-password/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Change user password' })
  @ApiParam({ name: 'userId', required: true, description: 'ID of the user' })
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({ status: 200, description: 'Password successfully changed' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async changePassword(
    @Param('userId') userId: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.userManagementService.changePassword(userId, changePasswordDto);
  }

  // ---------- Member Management Routes ----------

  @Post('register-member')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new member' })
  @ApiBody({ type: RegisterMemberDto })
  @ApiResponse({ status: 201, description: 'Member successfully registered' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async registerMember(@Body() registerMemberDto: RegisterMemberDto) {
    return this.userManagementService.registerMember(registerMemberDto);
  }

  @Get('members')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all members' })
  @ApiResponse({ status: 200, description: 'Members retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No members found' })
  async findAllMembers() {
    return this.userManagementService.findAllMembers();
  }

  @Put('update-profile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user profile' })
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({ status: 200, description: 'Profile successfully updated' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async updateProfile(@Body() updateProfileDto: UpdateProfileDto) {
    return this.userManagementService.updateProfile(updateProfileDto);
  }

  // ---------- Role Management Routes ----------

  @Post('assign-role')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Assign role to user' })
  @ApiBody({ type: AssignRoleDto })
  @ApiResponse({ status: 201, description: 'Role successfully assigned' })
  @ApiResponse({ status: 400, description: 'Invalid role data' })
  async assignRole(@Body() assignRoleDto: AssignRoleDto) {
    return this.userManagementService.assignRole(assignRoleDto);
  }

  // ---------- Applicant Management Routes ----------

  @Post('apply')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit an application' })
  @ApiBody({ type: ApplyDto })
  @ApiResponse({
    status: 201,
    description: 'Application successfully submitted',
  })
  @ApiResponse({ status: 400, description: 'Invalid application data' })
  async apply(@Body() applyDto: ApplyDto) {
    return this.userManagementService.apply(applyDto);
  }

  @Put('accept-application/:applicantId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Accept an application' })
  @ApiParam({
    name: 'applicantId',
    required: true,
    description: 'ID of the applicant',
  })
  @ApiResponse({ status: 200, description: 'Application accepted' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  async acceptApplication(@Param('applicantId') applicantId: string) {
    return this.userManagementService.acceptApplication(applicantId);
  }

  @Put('reject-application/:applicantId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reject an application' })
  @ApiParam({
    name: 'applicantId',
    required: true,
    description: 'ID of the applicant',
  })
  @ApiResponse({ status: 200, description: 'Application rejected' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  async rejectApplication(@Param('applicantId') applicantId: string) {
    return this.userManagementService.rejectApplication(applicantId);
  }

  // ---------- Settings Management Routes ----------

  @Put('update-settings')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user settings' })
  @ApiBody({ type: UpdateSettingsDto })
  @ApiResponse({ status: 200, description: 'Settings successfully updated' })
  @ApiResponse({ status: 400, description: 'Invalid settings data' })
  async updateSettings(@Body() updateSettingsDto: UpdateSettingsDto) {
    return this.userManagementService.updateSettings(updateSettingsDto);
  }
}
