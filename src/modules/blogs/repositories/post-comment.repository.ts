import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PostComment,
  PostCommentDocument,
} from '../schemas/post-comment.schema';
import { CreatePostCommentDto } from '../dto/create-post-comment.dto';
import { UpdatePostCommentDto } from '../dto/update-post-comment.dto';

@Injectable()
export class PostCommentRepository {
  constructor(
    @InjectModel(PostComment.name)
    private postCommentModel: Model<PostCommentDocument>,
  ) {}

  // Create a new comment
  async create(
    createPostCommentDto: CreatePostCommentDto,
  ): Promise<PostComment> {
    const newComment = new this.postCommentModel(createPostCommentDto);
    return newComment.save();
  }

  // Find all comments for a specific post
  async findAllByPostId(postId: string): Promise<PostComment[]> {
    return this.postCommentModel.find({ postId }).exec();
  }

  // Find a comment by ID
  async findOne(id: string): Promise<PostComment> {
    return this.postCommentModel.findById(id).exec();
  }

  // Update a comment by ID
  async update(
    id: string,
    updatePostCommentDto: UpdatePostCommentDto,
  ): Promise<PostComment> {
    return this.postCommentModel
      .findByIdAndUpdate(id, updatePostCommentDto, { new: true })
      .exec();
  }

  // Delete a comment by ID
  async delete(id: string): Promise<PostComment> {
    return this.postCommentModel.findByIdAndDelete(id).exec();
  }
}
