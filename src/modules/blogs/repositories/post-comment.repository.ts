import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  PostComment,
  PostCommentDocument,
} from '../schemas/post-comment.schema';
import { CreatePostCommentDto } from '../dto/create-post-comment.dto';
import { UpdatePostCommentDto } from '../dto/update-post-comment.dto';

export interface PostCommentWithId extends Omit<PostComment, '_id'> {
  _id: string;
}

@Injectable()
export class PostCommentRepository {
  constructor(
    @InjectModel(PostComment.name)
    private postCommentModel: Model<PostCommentDocument>,
  ) {}

    // Helper function to ensure string IDs are converted to ObjectId
  private toObjectId(id: string | Types.ObjectId): Types.ObjectId {
    return typeof id === 'string' ? new Types.ObjectId(id) : id;
  }

      // Helper function to update all userId fields to ObjectIds in the collection
  private async ensureUserIdsAreObjectIds(): Promise<void> {
    await this.postCommentModel.updateMany(
      { userId: { $type: 'string' } },  // find documents where userId is still a string
      [{ $set: { userId: { $toObjectId: '$userId' } } }] // convert userId to ObjectId
    ).exec();
  }

  // Create a new comment
  async create(
    createPostCommentDto: CreatePostCommentDto,
  ): Promise<PostComment> {
        createPostCommentDto.userId = this.toObjectId(createPostCommentDto.userId);
    const newComment = new this.postCommentModel(createPostCommentDto);
    return newComment.save();
  }

  // Find all comments for a specific post
  async findAllByPostId(postId: string): Promise<PostCommentWithId[]> {
    await this.ensureUserIdsAreObjectIds();
    const comments = await this.postCommentModel.find({ postId }).populate('userId').lean().exec();
    return comments.map((comment) => ({
      ...comment,
      _id: comment._id.toString(),
    }));
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
