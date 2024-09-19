import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BlogPostRepository } from '../repositories/blog-post.repository';
import { UpdateBlogPostDto } from '../dto/update-blog-post.dto';
import { BlogPost } from '../schemas/blog-post.schema';

@Injectable()
export class UpdateBlogPostUseCase {
  constructor(private readonly blogPostRepository: BlogPostRepository) {}

  async execute(
    id: string,
    updateBlogPostDto: UpdateBlogPostDto,
  ): Promise<BlogPost> {
    try {
      // Check if the blog post exists
      const existingPost = await this.blogPostRepository.findOne(id);
      if (!existingPost) {
        throw new NotFoundException(`Blog post with ID ${id} not found`);
      }

      // Validate the update data (if necessary, based on your business logic)
      if (!updateBlogPostDto.title && !updateBlogPostDto.content) {
        throw new BadRequestException(
          'Title or content must be provided for update',
        );
      }

      // Proceed with the update
      const updatedPost = await this.blogPostRepository.update(
        id,
        updateBlogPostDto,
      );

      if (!updatedPost) {
        throw new InternalServerErrorException(
          `Failed to update blog post with ID ${id}`,
        );
      }

      return updatedPost;
    } catch (error) {
      // Catch and rethrow any unexpected error
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error; // Let the known exceptions propagate
      } else {
        // Log the error for debugging purposes and throw a generic internal error
        console.error('Error updating blog post:', error);
        throw new InternalServerErrorException(
          'An unexpected error occurred while updating the blog post',
        );
      }
    }
  }
}
