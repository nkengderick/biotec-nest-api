import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CommentReaction,
  CommentReactionDocument,
} from '../schemas/comment-reaction.schema';
import { ToggleCommentReactionDto } from '../dto/toggle-comment-reaction.dto';

@Injectable()
export class CommentReactionRepository {
  constructor(
    @InjectModel(CommentReaction.name)
    private commentReactionModel: Model<CommentReactionDocument>,
  ) {}

  // Helper function to ensure string IDs are converted to ObjectId
  private toObjectId(id: string | Types.ObjectId): Types.ObjectId {
    return typeof id === 'string' ? new Types.ObjectId(id) : id;
  }

      // Helper function to update all userId fields to ObjectIds in the collection
  private async ensureUserIdsAreObjectIds(): Promise<void> {
    await this.commentReactionModel.updateMany(
      { userId: { $type: 'string' } },  // find documents where userId is still a string
      [{ $set: { userId: { $toObjectId: '$userId' } } }] // convert userId to ObjectId
    ).exec();
  }

  // Create or update a reaction for a comment
  async createOrUpdate(
    toggleCommentReactionDto: ToggleCommentReactionDto,
  ): Promise<CommentReaction> {
    // Ensure commentId and userId are ObjectIds
    toggleCommentReactionDto.userId = this.toObjectId(toggleCommentReactionDto.userId);

    const newReaction = new this.commentReactionModel(toggleCommentReactionDto);
    return newReaction.save();
  }

  // Find all reactions for a specific comment
  async findAllByCommentId(commentId: string): Promise<CommentReaction[]> {
    await this.ensureUserIdsAreObjectIds();
    return this.commentReactionModel.find({ commentId }).populate('userId').exec();
  }

  // Find a reaction by comment ID and user ID
  async findByCommentIdAndUserId(
    commentId: string,
    userId: string,
  ): Promise<any | null> {
    return this.commentReactionModel.findOne({ commentId, userId }).exec();
  }

  // Update reaction type by ID
  async updateReactionType(
    id: string,
    reactionType: string,
  ): Promise<CommentReaction> {
    return this.commentReactionModel
      .findByIdAndUpdate(id, { reactionType }, { new: true })
      .exec();
  }

  // Delete a reaction by ID
  async delete(id: string): Promise<CommentReaction> {
    return this.commentReactionModel.findByIdAndDelete(id).exec();
  }
}
