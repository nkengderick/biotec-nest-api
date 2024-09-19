import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';

export class TogglePostReactionDto {
  @ApiProperty({ description: 'The ID of the post to react to' })
  @IsNotEmpty({ message: 'Post ID is required' })
  @IsString({ message: 'Post ID must be a string' })
  @IsMongoId({ message: 'Post ID must be a valid MongoDB ObjectId' })
  postId: Types.ObjectId;

  @ApiProperty({ description: 'User ID of the person reacting' })
  @IsNotEmpty({ message: 'User ID is required' })
  @IsString({ message: 'User ID must be a string' })
  @IsMongoId({ message: 'User ID must be a valid MongoDB ObjectId' })
  userId: Types.ObjectId;

  @ApiProperty({ description: 'The type of reaction (like or dislike)' })
  @IsNotEmpty({ message: 'Reaction type is required' })
  @IsEnum(['like', 'dislike'], {
    message: 'Reaction type must be like or dislike',
  })
  reactionType: 'like' | 'dislike';

  @ApiProperty({
    description: 'Indicates whether the reaction should be removed',
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Remove flag must be a boolean' })
  remove?: boolean;
}
