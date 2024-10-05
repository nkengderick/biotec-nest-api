import { Controller, Post, Body, Param, Put, Delete, Get } from '@nestjs/common';
import { BlogService } from '../services/blog.service';
import { CreateBlogPostDto } from '../dto/create-blog-post.dto';
import { UpdateBlogPostDto } from '../dto/update-blog-post.dto';
import { CreatePostCommentDto } from '../dto/create-post-comment.dto';
import { UpdatePostCommentDto } from '../dto/update-post-comment.dto';
import { TogglePostReactionDto } from '../dto/toggle-post-reaction.dto';
import { ToggleCommentReactionDto } from '../dto/toggle-comment-reaction.dto';
import {
  ApiTags,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // Blog Post Endpoints

  @Post('posts')
  @ApiOperation({
    summary: 'Create a new blog post',
    description:
      'Creates a new blog post with the provided title, content, author, and optional fields such as category and featured image.',
  })
  @ApiBody({ type: CreateBlogPostDto })
  @ApiResponse({ status: 201, description: 'Blog post created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  createBlogPost(@Body() createBlogPostDto: CreateBlogPostDto) {
    return this.blogService.createBlogPost(createBlogPostDto);
  }

  @Put('posts/:id')
  @ApiOperation({
    summary: 'Update an existing blog post',
    description:
      'Updates the specified blog post by ID with the provided updated information such as title, content, category, etc.',
  })
  @ApiParam({ name: 'id', description: 'ID of the blog post' })
  @ApiBody({ type: UpdateBlogPostDto })
  @ApiResponse({ status: 200, description: 'Blog post updated successfully.' })
  @ApiResponse({ status: 404, description: 'Blog post not found.' })
  updateBlogPost(
    @Param('id') id: string,
    @Body() updateBlogPostDto: UpdateBlogPostDto,
  ) {
    return this.blogService.updateBlogPost(id, updateBlogPostDto);
  }

  @Delete('posts/:id')
  @ApiOperation({
    summary: 'Delete a blog post',
    description:
      'Deletes a blog post by its ID. If the post does not exist, a 404 error is returned.',
  })
  @ApiParam({ name: 'id', description: 'ID of the blog post' })
  @ApiResponse({ status: 200, description: 'Blog post deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Blog post not found.' })
  deleteBlogPost(@Param('id') id: string) {
    return this.blogService.deleteBlogPost(id);
  }

  // Comment Endpoints

  @Post('comments')
  @ApiOperation({
    summary: 'Create a comment on a blog post',
    description:
      'Allows a user to create a comment on a specific blog post. The comment is linked to the user and the post via IDs.',
  })
  @ApiBody({ type: CreatePostCommentDto })
  @ApiResponse({ status: 201, description: 'Comment created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  createPostComment(@Body() createPostCommentDto: CreatePostCommentDto) {
    return this.blogService.createPostComment(createPostCommentDto);
  }

  @Put('comments/:id')
  @ApiOperation({
    summary: 'Update an existing comment',
    description:
      'Updates the content of an existing comment by its ID. If the comment does not exist, a 404 error is returned.',
  })
  @ApiParam({ name: 'id', description: 'ID of the comment' })
  @ApiBody({ type: UpdatePostCommentDto })
  @ApiResponse({ status: 200, description: 'Comment updated successfully.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  updatePostComment(
    @Param('id') id: string,
    @Body() updatePostCommentDto: UpdatePostCommentDto,
  ) {
    return this.blogService.updatePostComment(id, updatePostCommentDto);
  }

  // Post Reaction Endpoints

  @Post('posts/reactions')
  @ApiOperation({
    summary: 'Toggle a reaction on a blog post',
    description: `
      Allows a user to toggle a reaction (like or dislike) on a blog post. 
      If the user has not reacted before, a new reaction is created. 
      If the user has already reacted with a different type, the reaction type is updated.
      If the request includes the "remove" flag, the reaction is removed.
    `,
  })
  @ApiBody({ type: TogglePostReactionDto })
  @ApiResponse({
    status: 200,
    description:
      'Post reaction toggled successfully. The response depends on the action: creating, updating, or removing a reaction.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  togglePostReaction(@Body() togglePostReactionDto: TogglePostReactionDto) {
    return this.blogService.togglePostReaction(togglePostReactionDto);
  }

  // Comment Reaction Endpoints

  @Post('comments/reactions')
  @ApiOperation({
    summary: 'Toggle a reaction on a comment',
    description: `
      Allows a user to toggle a reaction (like or dislike) on a comment. 
      If the user has not reacted before, a new reaction is created. 
      If the user has already reacted with a different type, the reaction type is updated.
      If the request includes the "remove" flag, the reaction is removed.
    `,
  })
  @ApiBody({ type: ToggleCommentReactionDto })
  @ApiResponse({
    status: 200,
    description:
      'Comment reaction toggled successfully. The response depends on the action: creating, updating, or removing a reaction.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  toggleCommentReaction(
    @Body() toggleCommentReactionDto: ToggleCommentReactionDto,
  ) {
    return this.blogService.toggleCommentReaction(toggleCommentReactionDto);
  }

  @Get('posts')
  @ApiOperation({
    summary: 'Get all blog posts with comments and reactions',
    description:
      'Retrieves all blog posts along with their associated comments and reactions.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all blog posts with comments and reactions.',
  })
  findAllBlogs() {
    return this.blogService.findAllBlogs();
  }
}
