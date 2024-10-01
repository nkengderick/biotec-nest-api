import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsDateString, IsDate, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class BookServiceDto {
  @ApiProperty({ description: 'Service ID being booked', type: String })
  @IsMongoId({ message: 'Service ID must be a valid MongoDB ObjectId' })
  service_id: Types.ObjectId;

  @ApiProperty({ description: 'User ID booking the service', type: String })
  @IsMongoId({ message: 'User ID must be a valid MongoDB ObjectId' })
  user_id: Types.ObjectId;

  @ApiProperty({ description: 'Details from booker', type: String })
  @IsString({ message: 'Short further details about what user wants' })
  description?: string;

  @ApiProperty({ description: 'Date of the booking', type: String })
  @Type(() => Date)
  @IsDate({ message: 'Booking date must be a valid date' })
  booking_date: string;
}
