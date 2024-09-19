import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogPostRepository } from '../repositories/blog-post.repository';
import { CreateBlogPostDto } from '../dto/create-blog-post.dto';
import { BlogPost } from '../schemas/blog-post.schema';
import { MemberRepository } from 'src/modules/user-management/repositories/member.repository';

@Injectable()
export class CreateBlogPostUseCase {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly memberRepository: MemberRepository,
  ) {}

  async execute(createBlogPostDto: CreateBlogPostDto): Promise<BlogPost> {
    // Check if the author exists
    const memberExists = await this.memberRepository.findById(
      createBlogPostDto.authorId.toString(),
    );

    if (!memberExists) {
      throw new NotFoundException(
        `Member with ID ${createBlogPostDto.authorId} does not exist`,
      );
    }

    // If member exists, proceed with creating the blog post
    return this.blogPostRepository.create(createBlogPostDto);
  }
}
