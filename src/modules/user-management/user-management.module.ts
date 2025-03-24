import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { UserManagementController } from './controllers/user-management.controller';

// Services
import { UserManagementService } from './services/user-management.service';

// Repositories
import { UserRepository } from './repositories/user.repository';
import { MemberRepository } from './repositories/member.repository';
import { ApplicantRepository } from './repositories/applicant.repository';
import { MemberRoleRepository } from './repositories/member-role.repository';
import { UserSettingsRepository } from './repositories/user-settings.repository';

// Schemas
import { User, UserSchema } from './schemas/user.schema';
import { Member, MemberSchema } from './schemas/member.schema';
import { Applicant, ApplicantSchema } from './schemas/applicant.schema';
import { MemberRole, MemberRoleSchema } from './schemas/member-role.schema';
import {
  UserSettings,
  UserSettingsSchema,
} from './schemas/user-settings.schema';

// Use Cases
import { ApplyUseCase } from './use-cases/apply.use-case';
import { AcceptApplicationUseCase } from './use-cases/accept-application.use-case';
import { RejectApplicationUseCase } from './use-cases/reject-application.use-case';
import { RegisterMemberUseCase } from './use-cases/register-member.use-case';
import { SignUpUseCase } from './use-cases/sign-up.use-case';
import { ChangePasswordUseCase } from './use-cases/change-password.use-case';
import { UpdateProfileUseCase } from './use-cases/update-profile.use-case';
import { UpdateSettingsUseCase } from './use-cases/update-settings.use-case';
import { AssignRoleUseCase } from './use-cases/assign-role.use-case';
import { ForgotPasswordUseCase } from './use-cases/forgot-password.use-case';
import { ResetPasswordUseCase } from './use-cases/reset-password.use-case';
import { SignInUseCase } from './use-cases/sign-in.use-case';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from 'src/common/services/email.service';
import { SendEmailUseCase } from 'src/common/use-cases/send-email.use-case';
import { UpdateRoleUseCase } from './use-cases/update-role.use-case';
import { EmailTemplateService } from 'src/common/services/email-template.service';
import { About, AboutSchema } from '../about/schemas/about.schema';
import { GetAboutUseCase } from '../about/use-cases/get-about.use-case';
import { AboutRepository } from '../about/repositories/about.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Member.name, schema: MemberSchema },
      { name: Applicant.name, schema: ApplicantSchema },
      { name: MemberRole.name, schema: MemberRoleSchema },
      { name: UserSettings.name, schema: UserSettingsSchema },
      { name: About.name, schema: AboutSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [UserManagementController],
  providers: [
    // Services
    UserManagementService,
    EmailService,
    EmailTemplateService,

    // Repositories
    UserRepository,
    MemberRepository,
    ApplicantRepository,
    MemberRoleRepository,
    UserSettingsRepository,
    AboutRepository,

    // Use Cases
    ApplyUseCase,
    AcceptApplicationUseCase,
    RejectApplicationUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
    RegisterMemberUseCase,
    SignInUseCase,
    SignUpUseCase,
    ChangePasswordUseCase,
    UpdateProfileUseCase,
    UpdateSettingsUseCase,
    AssignRoleUseCase,
    SendEmailUseCase,
    UpdateRoleUseCase,
    GetAboutUseCase,
  ],
  exports: [
    UserManagementService,
    UserRepository,
    MemberRepository,
    ApplicantRepository,
    MemberRoleRepository,
    UserSettingsRepository,
  ],
})
export class UserManagementModule {}
