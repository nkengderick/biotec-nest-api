import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ServiceProviderDocument = ServiceProvider & Document;

@Schema({ timestamps: true })
export class ServiceProvider extends Document {
  @ApiProperty({
    description: 'Service associated with the member',
    type: String,
  })
  @Prop({ type: Types.ObjectId, ref: 'Service', required: true })
  service_id: Types.ObjectId;

  @ApiProperty({ description: 'Member providing the service', type: String })
  @Prop({ type: Types.ObjectId, ref: 'Member', required: true })
  member_id: Types.ObjectId;

  @ApiProperty({
    description: 'Availability of the member for providing the service',
    type: Object,
  })
  @Prop({ type: Object, required: true })
  availability: object;

  @ApiProperty({
    description: 'Date when the service provider entry was created',
  })
  @Prop({ default: Date.now })
  created_at: Date;

  @ApiProperty({
    description: 'Date when the service provider entry was last updated',
  })
  @Prop({ default: Date.now })
  updated_at: Date;
}

export const ServiceProviderSchema =
  SchemaFactory.createForClass(ServiceProvider);
