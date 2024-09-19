import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { WorkingHoursDto } from './availability.dto';

export class AssignProviderDto {
  @ApiProperty({ description: 'Service ID to be assigned', type: String })
  @IsMongoId({ message: 'Service ID must be a valid MongoDB ObjectId' })
  service_id: string;

  @ApiProperty({
    description: 'Member ID to whom the service is assigned',
    type: String,
  })
  @IsMongoId({ message: 'Member ID must be a valid MongoDB ObjectId' })
  member_id: string;

  @ApiProperty({
    description: 'Member’s availability for the service',
    type: [WorkingHoursDto],
  })
  @ValidateNested({ message: 'Availability must follow the correct structure' })
  @Type(() => WorkingHoursDto)
  availability: WorkingHoursDto[];
}
