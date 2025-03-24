import { Injectable, NotFoundException } from '@nestjs/common';
import { MemberRoleRepository } from '../repositories/member-role.repository';
import { UserRepository } from '../repositories/user.repository';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { SendEmailUseCase } from 'src/common/use-cases/send-email.use-case';
import { AssociationRole } from '../schemas/member-role.schema';

@Injectable()
export class UpdateRoleUseCase {
  constructor(
    private readonly memberRoleRepository: MemberRoleRepository,
    private readonly userRepository: UserRepository,
    private readonly sendEmailUseCase: SendEmailUseCase,
  ) {}

  async execute(updateRoleDto: UpdateRoleDto) {
    // 1. Update the role in the database
    const updatedRole = await this.memberRoleRepository.updateRole(
      updateRoleDto.member_id.toString(),
      updateRoleDto.role,
    );

    if (!updatedRole) {
      throw new NotFoundException('Role update failed');
    }

    // 2. Fetch user details
    const member = await this.memberRoleRepository.findByMemberId(
      updateRoleDto.member_id.toString(),
    );
    if (!member || member.length === 0) {
      throw new NotFoundException('Member not found');
    }
    const memberData = member[0];

    const user = await this.userRepository.findById(
      memberData.member_id.toString(),
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // 3. Send email to the user using template
    const templateData = {
      userName: user.first_name,
      userEmail: user.email,
      emailTitle: 'Your Role Has Been Updated',
      roleName: updateRoleDto.role,
      roleResponsibilities: this.getRoleResponsibilities(updateRoleDto.role),
      dashboardUrl: `${process.env.FRONTEND_URL}/profile`,
      actionRequired: true,
      actionUrl: `${process.env.FRONTEND_URL}/profile`,
      actionText: 'View Your Updated Profile',
      secondaryInfo:
        'This role change may affect your permissions and responsibilities within the association.',
    };

    await this.sendEmailUseCase.executeTemplated(
      user.email,
      'Your Role in the Association Has Been Updated',
      'role-update',
      templateData,
    );

    return { message: 'Role updated and email sent', updatedRole };
  }

  private getRoleResponsibilities(role: AssociationRole): string {
    switch (role) {
      case AssociationRole.President:
        return 'lead the association and set strategic direction';
      case AssociationRole.VicePresident:
        return 'support the President and assume leadership in their absence';
      case AssociationRole.Secretary:
        return 'manage administrative tasks and keep records';
      case AssociationRole.Treasurer:
        return "manage the association's finances";
      case AssociationRole.CEO:
        return 'oversee the executive management of the association';
      case AssociationRole.Director:
        return 'provide leadership and guidance in specific areas';
      case AssociationRole.Manager:
        return 'manage specific projects or teams';
      case AssociationRole.Coordinator:
        return 'coordinate activities and events';
      case AssociationRole.Advisor:
        return 'provide expert advice and guidance';
      case AssociationRole.Chairperson:
        return 'chair meetings and ensure effective discussions';
      case AssociationRole.BoardMember:
        return 'participate in board decisions and governance';
      case AssociationRole.RegularMember:
        return 'actively participate in association activities';
      case AssociationRole.Volunteer:
        return 'provide voluntary support and assistance';
      case AssociationRole.Patron:
        return 'provide financial or advisory support to the association';
      case AssociationRole.Auditor:
        return "review and verify the association's financial records";
      case AssociationRole.PublicRelationsOfficer:
        return "manage the association's public image and communications";
      case AssociationRole.EventCoordinator:
        return 'plan and execute association events';
      case AssociationRole.TechnicalAdvisor:
        return 'provide technical expertise and advice';
      case AssociationRole.LegalAdvisor:
        return 'provide legal counsel and guidance';
      case AssociationRole.FundraisingOfficer:
        return 'organize and manage fundraising efforts';
      case AssociationRole.MembershipOfficer:
        return 'manage membership recruitment and retention';
      case AssociationRole.ProjectManager:
        return 'lead and manage specific projects';
      case AssociationRole.Webmaster:
        return "manage and maintain the association's website";
      case AssociationRole.Archivist:
        return "maintain and preserve the association's records and history";
      case AssociationRole.LiaisonOfficer:
        return 'facilitate communication and relationships with other organizations';
      case AssociationRole.Consultant:
        return 'provide specialized consulting services';
      case AssociationRole.Intern:
        return 'gain practical experience through a temporary position';
      case AssociationRole.Fellow:
        return 'contribute specialized knowledge and expertise';
      case AssociationRole.HonoraryMember:
        return 'enjoy membership as a recognition of significant contributions';
      case AssociationRole.Trustee:
        return "manage and oversee the association's assets";
      case AssociationRole.Delegate:
        return 'represent the association at meetings and events';
      case AssociationRole.Observer:
        return 'attend meetings and events without voting rights';
      case AssociationRole.AssociateMember:
        return 'enjoy partial membership benefits';
      case AssociationRole.WorkingGroupMember:
        return 'participate in specific working groups';
      case AssociationRole.CommitteeMember:
        return 'contribute to the work of specific committees';
      case AssociationRole.RegionalRepresentative:
        return 'represent the association in a specific region';
      case AssociationRole.NationalRepresentative:
        return 'represent the association at the national level';
      case AssociationRole.InternationalRepresentative:
        return 'represent the association at the international level';
      case AssociationRole.Spokesperson:
        return 'communicate on behalf of the association to the media';
      case AssociationRole.Facilitator:
        return 'guide discussions and ensure effective communication';
      default:
        return 'fulfill your duties as a member of the association';
    }
  }
}
