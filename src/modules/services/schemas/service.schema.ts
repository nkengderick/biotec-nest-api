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

  @ApiProperty({ description: 'Description of the service' })
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
    enum: ['health', 'tech', 'microbiology', 'telemedicine'],
  })
  @Prop({
    required: true,
    enum: ['health', 'tech', 'microbiology', 'telemedicine'],
  })
  service_category: string;

  @ApiProperty({ description: 'Price of the service', required: false })
  @Prop({ required: false, default: null })
  price: number;

  @ApiProperty({
    description: 'Is the Service Verified?? (default: false)',
    type: Boolean,
  })
  @IsBoolean()
  @Prop({
    required: true,
    default: false,
  })
  is_verified: Boolean;

  @ApiProperty({
    description: 'Portfolio URLs for the service',
    type: [String],
  })
  @Prop({ type: [String] })
  portfolio_urls: string[];

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
