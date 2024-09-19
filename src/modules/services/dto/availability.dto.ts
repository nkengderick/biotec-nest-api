import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class WorkingHoursDto {
  @ApiProperty({ description: 'Day of the week', example: 'Monday' })
  @IsString({ message: 'Day must be a valid string' })
  @Matches(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$/, {
    message: 'Day must be a valid day of the week',
  })
  day: string;

  @ApiProperty({
    description: 'Start time in HH:mm format (24-hour)',
    example: '08:00',
  })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Start time must be in HH:mm format',
  })
  start_time: string;

  @ApiProperty({
    description: 'End time in HH:mm format (24-hour)',
    example: '21:00',
  })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'End time must be in HH:mm format',
  })
  end_time: string;
}
