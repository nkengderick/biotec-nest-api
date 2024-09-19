import { Injectable } from '@nestjs/common';
import { CreateBlogPostUseCase } from '../use-cases/create-blog-post.use-case';
import { UpdateBlogPostUseCase } from '../use-cases/update-blog-post.use-case';
import { DeleteBlogPostUseCase } from '../use-cases/delete-blog.use-case';
import { CreatePostCommentUseCase } from '../use-cases/create-post-comment.use-case';
import { TogglePostReactionUseCase } from '../use-cases/toggle-post-reaction.use-case';
import { ToggleCommentReactionUseCase } from '../use-cases/toggle-comment-reaction.use-case';
import { CreateBlogPostDto } from '../dto/create-blog-post.dto';
import { UpdateBlogPostDto } from '../dto/update-blog-post.dto';
import { CreatePostCommentDto } from '../dto/create-post-comment.dto';
import { TogglePostReactionDto } from '../dto/toggle-post-reaction.dto';
import { ToggleCommentReactionDto } from '../dto/toggle-comment-reaction.dto';
import { UpdatePostCommentUseCase } from '../use-cases/update-post-comment.use-case';
import { UpdatePostCommentDto } from '../dto/update-post-comment.dto';

@Injectable()
export class BlogService {
  constructor(
    private readonly createBlogPostUseCase: CreateBlogPostUseCase,
    private readonly updateBlogPostUseCase: UpdateBlogPostUseCase,
    private readonly deleteBlogPostUseCase: DeleteBlogPostUseCase,
    private readonly createPostCommentUseCase: CreatePostCommentUseCase,
    private readonly togglePostReactionUseCase: TogglePostReactionUseCase,
    private readonly toggleCommentReactionUseCase: ToggleCommentReactionUseCase,
    private readonly updatePostCommentUseCase: UpdatePostCommentUseCase,
  ) {}

  // Blog post operations
  createBlogPost(createBlogPostDto: CreateBlogPostDto) {
    return this.createBlogPostUseCase.execute(createBlogPostDto);
  }

  updateBlogPost(id: string, updateBlogPostDto: UpdateBlogPostDto) {
    return this.updateBlogPostUseCase.execute(id, updateBlogPostDto);
  }

  deleteBlogPost(id: string) {
    return this.deleteBlogPostUseCase.execute(id);
  }

  // Comment operations
  createPostComment(createPostCommentDto: CreatePostCommentDto) {
    return this.createPostCommentUseCase.execute(createPostCommentDto);
  }

  updatePostComment(id: string, updatePostCommentDto: UpdatePostCommentDto) {
    // Added method for updating a comment
    return this.updatePostCommentUseCase.execute(id, updatePostCommentDto);
  }

  // Reaction operations (Post)
  togglePostReaction(togglePostReactionDto: TogglePostReactionDto) {
    return this.togglePostReactionUseCase.execute(togglePostReactionDto);
  }

  // Reaction operations (Comment)
  toggleCommentReaction(toggleCommentReactionDto: ToggleCommentReactionDto) {
    return this.toggleCommentReactionUseCase.execute(toggleCommentReactionDto);
  }
}
