import { Injectable, NotFoundException } from '@nestjs/common';

// Use cases
import { ApplyUseCase } from '../use-cases/apply.use-case';
import { AcceptApplicationUseCase } from '../use-cases/accept-application.use-case';
import { RejectApplicationUseCase } from '../use-cases/reject-application.use-case';
import { RegisterMemberUseCase } from '../use-cases/register-member.use-case';
import { SignUpUseCase } from '../use-cases/sign-up.use-case';
import { ChangePasswordUseCase } from '../use-cases/change-password.use-case';
import { UpdateProfileUseCase } from '../use-cases/update-profile.use-case';
import { UpdateSettingsUseCase } from '../use-cases/update-settings.use-case';
import { AssignRoleUseCase } from '../use-cases/assign-role.use-case';
import { UpdateRoleUseCase } from '../use-cases/update-role.use-case';

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
import { ForgotPasswordUseCase } from '../use-cases/forgot-password.use-case';
import { ResetPasswordUseCase } from '../use-cases/reset-password.use-case';
import { SignInUseCase } from '../use-cases/sign-in.use-case';
import { MemberRepository } from '../repositories/member.repository';
import { ApplicantRepository } from '../repositories/applicant.repository';
import { UserRepository } from '../repositories/user.repository';
import { Member } from '../schemas/member.schema';
import { Applicant } from '../schemas/applicant.schema';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class UserManagementService {
  constructor(
    private readonly applyUseCase: ApplyUseCase,
    private readonly acceptApplicationUseCase: AcceptApplicationUseCase,
    private readonly rejectApplicationUseCase: RejectApplicationUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly registerMemberUseCase: RegisterMemberUseCase,
    private readonly signInUseCase: SignInUseCase,
    private readonly signUpUseCase: SignUpUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
    private readonly updateProfileUseCase: UpdateProfileUseCase,
    private readonly updateSettingsUseCase: UpdateSettingsUseCase,
    private readonly assignRoleUseCase: AssignRoleUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly memberRepository: MemberRepository,
    private readonly applicantRepository: ApplicantRepository,
    private readonly userRepository: UserRepository,
  ) {}

  // Application Process
  async apply(applyDto: ApplyDto) {
    return this.applyUseCase.execute(applyDto);
  }

  async acceptApplication(applicantId: string) {
    return this.acceptApplicationUseCase.execute(applicantId);
  }

  async rejectApplication(applicantId: string) {
    return this.rejectApplicationUseCase.execute(applicantId);
  }

  // Authentication
  async signUp(signUpDto: SignUpDto) {
    return this.signUpUseCase.execute(signUpDto);
  }

  async signIn(signInDto: SignInDto) {
    return this.signInUseCase.execute(signInDto);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    return this.forgotPasswordUseCase.execute(forgotPasswordDto);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    return this.resetPasswordUseCase.execute(resetPasswordDto);
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    return this.changePasswordUseCase.execute(userId, changePasswordDto);
  }

  // Member Profile and Role
  async registerMember(registerMemberDto: RegisterMemberDto) {
    return this.registerMemberUseCase.execute(registerMemberDto);
  }

  async updateProfile(updateProfileDto: UpdateProfileDto) {
    return this.updateProfileUseCase.execute(updateProfileDto);
  }

  async assignRole(assignRoleDto: AssignRoleDto) {
    return this.assignRoleUseCase.execute(assignRoleDto);
  }

  async updateRole(updateRoleDto: UpdateRoleDto) {
    return this.updateRoleUseCase.execute(updateRoleDto);
  }

  // Settings
  async updateSettings(updateSettingsDto: UpdateSettingsDto) {
    return this.updateSettingsUseCase.execute(updateSettingsDto);
  }

  // Fetch all members
  async findAllMembers() {
    const members = await this.memberRepository.findAllMembers();
    if (!members || members.length === 0) {
      throw new NotFoundException('No members found');
    }
    return members;
  }

  async findMemberByUserId(userId: string): Promise<Member | null> {
    const member = await this.memberRepository.findByUserId2(userId);
    if (!member) {
      throw new NotFoundException('No member found');
    }
    return member;
  }

  async findApplicantByUserId(userId: string): Promise<Applicant | null> {
    const applicant = await this.applicantRepository.findByUserId(userId);
    if (!applicant) {
      throw new NotFoundException('No Applicant found');
    }
    return applicant;
  }

  async findAllApplicants() {
    const applicants = await this.applicantRepository.findAll();
    if (!applicants || applicants.length === 0) {
      throw new NotFoundException('No applicants found');
    }
    return applicants;
  }

  async findAllUsers() {
    const users = await this.userRepository.findAll();
    if (!users || users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  }
}
