import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @ApiProperty({ description: 'User making the booking', type: String })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @ApiProperty({
    description: 'Service associated with the booking',
    type: String,
    required: false,
  })
  @Prop({ type: Types.ObjectId, ref: 'Service', required: false })
  service_id: Types.ObjectId;

  @ApiProperty({ description: 'Date and time when the booking was made' })
  @Prop({ required: true })
  booking_date: Date;

  @ApiProperty({
    description: 'Status of the booking',
    enum: ['pending', 'in process', 'confirmed', 'canceled'],
  })
  @Prop({
    required: true,
    enum: ['pending', 'in process', 'confirmed', 'canceled'],
    default: 'pending',
  })
  status: string;

  @ApiProperty({ description: 'Total cost of the booking' })
  @Prop({ required: false })
  total_cost: number;

  @ApiProperty({
    description: 'Reference to the payment made for the booking',
    type: String,
  })
  @Prop({ type: Types.ObjectId, ref: 'Payment', required: false })
  payment_id: Types.ObjectId;

  @ApiProperty({ description: 'Date when the booking was created' })
  @Prop({ default: Date.now })
  created_at: Date;

  @ApiProperty({ description: 'Date when the booking was last updated' })
  @Prop({ default: Date.now })
  updated_at: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
