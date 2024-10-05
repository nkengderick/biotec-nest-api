import { Module } from '@nestjs/common';
import { CreateBlogPostUseCase } from './use-cases/create-blog-post.use-case';
import { UpdateBlogPostUseCase } from './use-cases/update-blog-post.use-case';
import { CreatePostCommentUseCase } from './use-cases/create-post-comment.use-case';
import { TogglePostReactionUseCase } from './use-cases/toggle-post-reaction.use-case';
import { ToggleCommentReactionUseCase } from './use-cases/toggle-comment-reaction.use-case';
import { BlogPostRepository } from './repositories/blog-post.repository';
import { PostCommentRepository } from './repositories/post-comment.repository';
import { PostReactionRepository } from './repositories/post-reaction.repository';
import { CommentReactionRepository } from './repositories/comment-reaction.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPost, BlogPostSchema } from './schemas/blog-post.schema';
import { PostComment, PostCommentSchema } from './schemas/post-comment.schema';
import {
  PostReaction,
  PostReactionSchema,
} from './schemas/post-reaction.schema';
import {
  CommentReaction,
  CommentReactionSchema,
} from './schemas/comment-reaction.schema';
import { DeleteBlogPostUseCase } from './use-cases/delete-blog.use-case';
import { BlogService } from './services/blog.service';
import { BlogController } from './controllers/blog.controller';
import { UpdatePostCommentUseCase } from './use-cases/update-post-comment.use-case';
import { UserRepository } from '../user-management/repositories/user.repository';
import { MemberRepository } from '../user-management/repositories/member.repository';
import { Member, MemberSchema } from '../user-management/schemas/member.schema';
import { User, UserSchema } from '../user-management/schemas/user.schema';
import { BlogPostUseCase } from './use-cases/get-blogs.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogPost.name, schema: BlogPostSchema },
      { name: PostComment.name, schema: PostCommentSchema },
      { name: PostReaction.name, schema: PostReactionSchema },
      { name: CommentReaction.name, schema: CommentReactionSchema },
      { name: Member.name, schema: MemberSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [BlogController],
  providers: [
    BlogService,
    CreateBlogPostUseCase,
    UpdateBlogPostUseCase,
    DeleteBlogPostUseCase,
    CreatePostCommentUseCase,
    TogglePostReactionUseCase,
    ToggleCommentReactionUseCase,
    UpdatePostCommentUseCase,
    BlogPostUseCase,
    BlogPostRepository,
    PostCommentRepository,
    PostReactionRepository,
    CommentReactionRepository,
    UserRepository,
    MemberRepository,
  ],
})
export class BlogModule {}
