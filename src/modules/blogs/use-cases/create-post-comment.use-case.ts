import { Injectable, NotFoundException } from '@nestjs/common';
import { PostCommentRepository } from '../repositories/post-comment.repository';
import { BlogPostRepository } from '../repositories/blog-post.repository'; // Import BlogPostRepository
import { CreatePostCommentDto } from '../dto/create-post-comment.dto';
import { PostComment } from '../schemas/post-comment.schema';
import { UserRepository } from 'src/modules/user-management/repositories/user.repository';

@Injectable()
export class CreatePostCommentUseCase {
  constructor(
    private readonly postCommentRepository: PostCommentRepository,
    private readonly userRepository: UserRepository,
    private readonly blogPostRepository: BlogPostRepository, // Inject BlogPostRepository
  ) {}

  async execute(
    createPostCommentDto: CreatePostCommentDto,
  ): Promise<PostComment> {
    const { userId, postId } = createPostCommentDto;

    // Check if the user exists
    const userExists = await this.userRepository.findById(userId.toString());
    if (!userExists) {
      throw new NotFoundException(`User with ID ${userId} does not exist`);
    }

    // Check if the blog post exists
    const postExists = await this.blogPostRepository.findOne(
      postId.toString(),
    );
    if (!postExists) {
      throw new NotFoundException(`Blog post with ID ${postId} does not exist`);
    }

    // Proceed with creating the comment if both checks pass
    return this.postCommentRepository.create(createPostCommentDto);
  }
}
