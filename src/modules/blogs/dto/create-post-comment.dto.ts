import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePostCommentDto {
  @ApiProperty({ description: 'The ID of the blog post to comment on' })
  @IsNotEmpty({ message: 'Post ID is required' })
  @IsString({ message: 'Post ID must be a string' })
  @IsMongoId({ message: 'Post ID must be a valid MongoDB ObjectId' })
  postId: Types.ObjectId;

  @ApiProperty({ description: 'User ID of the person making the comment' })
  @IsNotEmpty({ message: 'User ID is required' })
  @IsString({ message: 'User ID must be a string' })
  @IsMongoId({ message: 'User ID must be a valid MongoDB ObjectId' })
  userId: Types.ObjectId;

  @ApiProperty({ description: 'The text content of the comment' })
  @IsNotEmpty({ message: 'Comment text is required' })
  @IsString({ message: 'Comment text must be a string' })
  commentText: string;
}
