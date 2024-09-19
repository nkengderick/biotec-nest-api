import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdatePostCommentDto {
  @ApiProperty({
    description: 'The text content of the comment',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Comment text must be a string' })
  commentText?: string;
}
