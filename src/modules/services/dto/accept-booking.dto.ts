import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class AcceptBookingDto {
  @ApiProperty({ description: 'Booking ID to be accepted', type: String })
  @IsMongoId({ message: 'Booking ID must be a valid MongoDB ObjectId' })
  booking_id: string;
}
