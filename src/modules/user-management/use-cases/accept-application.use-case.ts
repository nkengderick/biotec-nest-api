import { Injectable, NotFoundException } from '@nestjs/common';
import { ApplicantRepository } from '../repositories/applicant.repository';
import { UserRepository } from '../repositories/user.repository';
import { MemberRepository } from '../repositories/member.repository';
import { SendEmailUseCase } from 'src/common/use-cases/send-email.use-case';
import { AssignRoleUseCase } from './assign-role.use-case';
import { AssociationRole } from '../schemas/member-role.schema';
import { RegisterMemberUseCase } from './register-member.use-case';
import { RegisterMemberDto } from '../dto/register-member.dto';

@Injectable()
export class AcceptApplicationUseCase {
  constructor(
    private readonly applicantRepository: ApplicantRepository,
    private readonly userRepository: UserRepository,
    private readonly memberRepository: MemberRepository,
    private readonly registerMemberUseCase: RegisterMemberUseCase,
    private readonly sendEmailUseCase: SendEmailUseCase,
    private readonly assignRoleUseCase: AssignRoleUseCase,
  ) {}

  async execute(applicantId: string) {
    // 1. Find the applicant
    const applicant = await this.applicantRepository.findById(applicantId);

    if (!applicant) {
      throw new NotFoundException(`Applicant with ID ${applicantId} not found`);
    }

    // 2. Update the user type to 'member'
    const updatedUser = await this.userRepository.update(
      applicant.user_id.toString(),
      {
        user_type: 'member',
      },
    );

    if (!updatedUser) {
      throw new NotFoundException(
        `User with ID ${applicant.user_id} not found`,
      );
    }

    // 3. Generate memberid before creating member
    const memberid = await this.memberRepository.generateMemberId(
      updatedUser.user_category,
    );

    // 4. Create a new member based on applicant data
    const registerMemberDto = RegisterMemberDto.fromApplicant(applicant);
    registerMemberDto.memberid = memberid;
    registerMemberDto.cardissued = false;

    const newMember =
      await this.registerMemberUseCase.execute(registerMemberDto);

    if (!newMember) {
      throw new Error('Failed to create new member');
    }

    // 5. Assign 'Regular Member' role
    const assignRole = await this.assignRoleUseCase.execute({
      member_id: (newMember as any)._id,
      role: AssociationRole.RegularMember,
      assigned_by: 'system',
    });

    if (!assignRole) {
      throw new Error('Failed to assign role');
    }

    const updatedApplicant = await this.applicantRepository.update(
      applicant.user_id.toString(),
      {
        application_status: 'approved',
      },
    );

    // 6. Send a congratulatory email to the user using template
    const templateData = {
      userName: updatedUser.first_name,
      userEmail: updatedUser.email,
      emailTitle: 'Application Approved - Welcome to BioTec Universe!',
      dashboardUrl: `${process.env.FRONTEND_URL}/profile`,
      actionRequired: true,
      actionUrl: `${process.env.FRONTEND_URL}/profile`,
      actionText: 'Go to Member Profile',
      secondaryInfo:
        'Your membership gives you access to exclusive resources and events.',
    };

    await this.sendEmailUseCase.executeTemplated(
      updatedUser.email,
      'Congratulations! Your Application Has Been Approved',
      'accept-application',
      templateData,
    );

    return {
      message:
        'Application accepted, user promoted to member, new member created, memberID generated, regular member role assigned, and email sent',
      applicant,
      updatedUser,
      newMember,
      assignRole,
    };
  }
}
