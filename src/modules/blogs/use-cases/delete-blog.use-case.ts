import { Injectable } from '@nestjs/common';
import { BlogPostRepository } from '../repositories/blog-post.repository';

@Injectable()
export class DeleteBlogPostUseCase {
  constructor(private readonly blogPostRepository: BlogPostRepository) {}

  async execute(id: string): Promise<void> {
    await this.blogPostRepository.delete(id);
  }
}
