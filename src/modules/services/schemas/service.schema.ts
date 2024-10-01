import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export type ServiceDocument = Service & Document;

@Schema({ timestamps: true })
export class Service {
  @ApiProperty({ description: 'Title of the service' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Short description or summary of the service' })
  @Prop({ required: true })
  summary: string;

  @ApiProperty({ description: 'Detailed description of the service' })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    description: 'Type of service (association or member)',
    enum: ['association', 'member'],
  })
  @Prop({ required: true, enum: ['association', 'member'] })
  service_type: string;

  @ApiProperty({
    description: 'Category of the service',
    enum: ['health', 'technology', 'education', 'business', 'microbiology', 'telemedicine', 'other'],
    default: 'other',
  })
  @Prop({
    required: true,
    enum: ['health', 'education', 'technology', 'business', 'microbiology', 'telemedicine', 'other'],
    default: 'other',
  })
  service_category: string;

  @ApiProperty({
    description: 'Is the service verified? (default: false)',
    type: Boolean,
  })
  @IsBoolean()
  @Prop({
    required: true,
    default: false,
  })
  is_verified: boolean;

  @ApiProperty({
    description: 'Portfolio URLs related to the service',
    type: [String],
  })
  @Prop({ type: [String] })
  portfolio_urls: string[];

  @ApiProperty({ description: 'Pricing plans for the service', type: [Object] })
  @Prop({
    type: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: false },
        billing_cycle: { type: String, required: false },
      },
    ],
    required: true,
  })
  pricing_plans: {
    name: string;
    price: number;
    description?: string;
    billing_cycle?: string;
  }[];

  // Reference to the service providers
  @ApiProperty({ description: 'List of service providers' })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'ServiceProvider' }] })
  service_providers: Types.ObjectId[];

  // Reference to the bookings for this service
  @ApiProperty({ description: 'List of bookings for the service' })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Booking' }] })
  bookings: Types.ObjectId[];
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
