import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemberRole, MemberRoleDocument } from '../schemas/member-role.schema';

@Injectable()
export class MemberRoleRepository {
  constructor(
    @InjectModel(MemberRole.name)
    private memberRoleModel: Model<MemberRoleDocument>,
  ) {}

  // Create a new member role
  async create(memberRole: Partial<MemberRole>): Promise<MemberRole> {
    const newMemberRole = new this.memberRoleModel(memberRole);
    return newMemberRole.save();
  }

  // Find member roles by member ID
  async findByMemberId(memberId: string): Promise<MemberRole[]> {
    return this.memberRoleModel.find({ member_id: memberId }).exec();
  }

  // Update a member role by member ID
  async updateRole(memberId: string, role: string): Promise<MemberRole> {
    return this.memberRoleModel
      .findOneAndUpdate({ member_id: memberId }, { role }, { new: true })
      .exec();
  }

  // Delete a member role by member ID
  async deleteRole(memberId: string): Promise<void> {
    await this.memberRoleModel.deleteOne({ member_id: memberId }).exec();
  }
}
