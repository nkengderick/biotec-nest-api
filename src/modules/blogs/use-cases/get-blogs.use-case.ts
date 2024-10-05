import { Injectable } from '@nestjs/common';
import { BlogPostRepository } from '../repositories/blog-post.repository';
import { PostCommentRepository } from '../repositories/post-comment.repository';
import { CommentReactionRepository } from '../repositories/comment-reaction.repository';
import { PostReactionRepository } from '../repositories/post-reaction.repository';

@Injectable()
export class BlogPostUseCase {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly postCommentRepository: PostCommentRepository,
    private readonly commentReactionRepository: CommentReactionRepository,
    private readonly postReactionRepository: PostReactionRepository,
  ) {}

  // Find all blog posts with their comments and reactions
  async findAllWithCommentsAndReactions() {
    // Step 1: Fetch all blog posts
    const blogPosts = await this.blogPostRepository.findAll();

    // Step 2: For each blog post, gather its comments and reactions
    const result = await Promise.all(
      blogPosts.map(async (post) => {
        // Fetch comments for the post
        const comments = await this.postCommentRepository.findAllByPostId(
          post._id.toString(), // Ensure the post's _id is treated as a string
        );

        // Fetch reactions for the post
        const postReactions = await this.postReactionRepository.findAllByPostId(
          post._id.toString(), // Ensure the post's _id is treated as a string
        );

        // Step 3: For each comment, gather its reactions
        const commentsWithReactions = await Promise.all(
          comments.map(async (comment) => {
            const commentReactions =
              await this.commentReactionRepository.findAllByCommentId(
                comment._id.toString(), // Ensure the comment's _id is treated as a string
              );
            return {
              ...comment, // No need for toObject() if you are using .lean() in the repository
              reactions: commentReactions, // Add reactions to the comment
            };
          }),
        );

        // Step 4: Assemble the post with comments and reactions
        return {
          ...post, // No need for toObject() if you are using .lean() in the repository
          comments: commentsWithReactions, // Add comments (with reactions) to the post
          reactions: postReactions, // Add post reactions
        };
      }),
    );

    // Step 5: Return the result (all blog posts with their comments and reactions)
    return result;
  }
}
