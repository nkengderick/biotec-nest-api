import { Injectable, NotFoundException } from '@nestjs/common';
import { PostCommentRepository } from '../repositories/post-comment.repository';
import { UpdatePostCommentDto } from '../dto/update-post-comment.dto';
import { PostComment } from '../schemas/post-comment.schema';

@Injectable()
export class UpdatePostCommentUseCase {
  constructor(private readonly postCommentRepository: PostCommentRepository) {}

  async execute(
    id: string,
    updatePostCommentDto: UpdatePostCommentDto,
  ): Promise<PostComment> {
    const existingComment = await this.postCommentRepository.findOne(id);

    if (!existingComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return this.postCommentRepository.update(id, updatePostCommentDto);
  }
}
