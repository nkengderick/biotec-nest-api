import { Injectable } from '@nestjs/common';
import { UserSettingsRepository } from '../repositories/user-settings.repository';
import { UpdateSettingsDto } from '../dto/update-user-settings.dto';

@Injectable()
export class UpdateSettingsUseCase {
  constructor(
    private readonly userSettingsRepository: UserSettingsRepository,
  ) {}

  async execute(updateSettingsDto: UpdateSettingsDto) {
    return this.userSettingsRepository.update(
      updateSettingsDto.user_id,
      updateSettingsDto,
    );
  }
}
