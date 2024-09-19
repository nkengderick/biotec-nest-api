import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  UserSettings,
  UserSettingsDocument,
} from '../schemas/user-settings.schema';

@Injectable()
export class UserSettingsRepository {
  constructor(
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettingsDocument>,
  ) {}

  async findByUserId(userId: string): Promise<UserSettings[]> {
    return this.userSettingsModel.find({ user_id: userId }).exec();
  }

  async update(
    userId: Types.ObjectId,
    settings: Partial<UserSettings>,
  ): Promise<UserSettings> {
    return this.userSettingsModel
      .findOneAndUpdate({ user_id: userId }, settings, { new: true })
      .exec();
  }
}
