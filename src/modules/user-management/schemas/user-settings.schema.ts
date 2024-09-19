import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserSettingsDocument = UserSettings & Document;

@Schema()
export class UserSettings {
  @ApiProperty({
    description: 'The ID of the user these settings belong to',
    example: '64fc8593b193c2b9aef76132',
  })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @ApiProperty({
    description: 'Key for the specific setting being stored',
    example: 'theme, language',
  })
  @Prop({ required: true })
  setting_key: string;

  @ApiProperty({
    description: 'Value for the specified setting key',
    example: 'dark, english',
  })
  @Prop({ required: true })
  setting_value: string;

  @ApiProperty({
    description:
      'Boolean flag indicating if the user has enabled notifications',
    example: false,
    default: false,
  })
  @Prop({ default: false })
  notification_preferences: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
