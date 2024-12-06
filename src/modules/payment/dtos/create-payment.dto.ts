import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEmail,
  IsEnum,
  Min,
  IsISO8601,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentStatus } from '../enums/payment-status.enum';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'The payment amount',
    type: Number,
    example: 500.75,
  })
  @IsNotEmpty({ message: 'Payment amount is required.' })
  @IsNumber({}, { message: 'Payment amount must be a valid number.' })
  @Min(1, { message: 'Payment amount must be at least 1.' })
  amount: number;

  @ApiProperty({
    description: 'ID of the user who made the payment',
    type: String,
    example: '63f91b7e9bcd5e0012345678',
  })
  @IsNotEmpty({ message: 'User ID is required.' })
  @IsString({ message: 'User ID must be a valid string.' })
  userId: string;

  @ApiProperty({
    description: 'Unique identifier for the external payment',
    example: 'external-12345',
  })
  @IsNotEmpty({ message: 'External ID is required.' })
  @IsString({ message: 'External ID must be a valid string.' })
  externalId: string;

  @ApiProperty({
    description: 'Currency of the payment',
    example: 'USD',
  })
  @IsNotEmpty({ message: 'Currency is required.' })
  @IsString({ message: 'Currency must be a valid string.' })
  currency: string;

  @ApiPropertyOptional({
    description: 'Email of the user making the payment',
    example: 'user@example.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email?: string;

  @ApiPropertyOptional({
    description: 'Optional message regarding the payment',
    example: 'Payment for order #12345',
  })
  @IsOptional()
  @IsString({ message: 'Message must be a valid string.' })
  message?: string;

  @ApiPropertyOptional({
    description: 'Payment method used for the transaction',
    example: 'credit_card',
  })
  @IsOptional()
  @IsString({ message: 'Payment method must be a valid string.' })
  paymentMethod?: string;

  @ApiPropertyOptional({
    description: 'Transaction ID assigned by the payment provider',
    example: 'txn-67890',
  })
  @IsOptional()
  @IsString({ message: 'Transaction ID must be a valid string.' })
  transactionId?: string;

  @ApiPropertyOptional({
    description: 'Date when the payment was confirmed',
    type: String,
    format: 'date-time',
    example: '2023-03-15T13:45:30.000Z',
  })
  @IsOptional()
  @IsISO8601({}, { message: 'Date confirmed must be in ISO 8601 format.' })
  dateConfirmed?: string;

  @ApiPropertyOptional({
    description: 'Date when the payment was initiated',
    type: String,
    format: 'date-time',
    example: '2023-03-15T12:00:00.000Z',
  })
  @IsOptional()
  @IsISO8601({}, { message: 'Date initiated must be in ISO 8601 format.' })
  dateInitiated?: string;

  @ApiPropertyOptional({
    description: 'Current status of the payment',
    enum: PaymentStatus,
    example: PaymentStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(PaymentStatus, {
    message: 'Status must be a valid PaymentStatus enum value.',
  })
  status?: PaymentStatus;
}
