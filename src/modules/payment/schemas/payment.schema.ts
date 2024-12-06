import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Date, Document, Types } from 'mongoose';
import { PaymentStatus } from '../enums/payment-status.enum';

@Schema({ timestamps: true })
export class Payment extends Document {
  @ApiProperty({
    description: 'ID of the user who made the payment',
    type: String,
    example: '63f91b7e9bcd5e0012345678',
  })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @ApiProperty({
    description: 'Unique identifier for the external payment',
    example: 'external-12345',
  })
  @Prop({ required: true, unique: true })
  externalId: string;

  @ApiProperty({
    description: 'The payment amount',
    type: Number,
    example: 500.75,
  })
  @Prop({ required: true })
  amount: number;

  @ApiProperty({
    description: 'Currency of the payment',
    example: 'USD',
  })
  @Prop({ required: true })
  currency: string;

  @ApiPropertyOptional({
    description: 'Email of the user making the payment',
    example: 'user@example.com',
  })
  @Prop({ required: false })
  email?: string;

  @ApiProperty({
    description: 'Current status of the payment',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
    example: PaymentStatus.PENDING,
  })
  @Prop({ enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @ApiPropertyOptional({
    description: 'Optional message regarding the payment',
    example: 'Payment for order #12345',
  })
  @Prop({ required: false })
  message?: string;

  @ApiPropertyOptional({
    description: 'Date when the payment was confirmed',
    type: String,
    format: 'date-time',
    example: '2023-03-15T13:45:30.000Z',
  })
  @Prop({ type: Date, required: false })
  dateConfirmed?: Date;

  @ApiPropertyOptional({
    description: 'Date when the payment was initiated',
    type: String,
    format: 'date-time',
    example: '2023-03-15T12:00:00.000Z',
  })
  @Prop({ type: Date, required: false })
  dateInitiated?: Date;

  @ApiPropertyOptional({
    description: 'Transaction ID assigned by the payment provider',
    example: 'txn-67890',
  })
  @Prop({ required: false })
  transactionId?: string;

  @ApiPropertyOptional({
    description: 'Payment method used for the transaction',
    example: 'credit_card',
  })
  @Prop({ required: false })
  paymentMethod?: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
