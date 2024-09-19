import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class UpdateSettingsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID of the user whose settings are being updated',
    type: String,
  })
  readonly user_id: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Key of the setting to update', type: String })
  readonly setting_key: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'New value for the setting', type: String })
  readonly setting_value: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Whether the user has enabled notifications',
    type: Boolean,
    required: false,
  })
  readonly notification_preferences?: boolean;
}
