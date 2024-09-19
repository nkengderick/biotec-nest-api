import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  // Create or update a reaction for a comment
  async createOrUpdate(
    toggleCommentReactionDto: ToggleCommentReactionDto,
  ): Promise<CommentReaction> {
    const newReaction = new this.commentReactionModel(toggleCommentReactionDto);
    return newReaction.save();
  }

  // Find all reactions for a specific comment
  async findAllByCommentId(commentId: string): Promise<CommentReaction[]> {
    return this.commentReactionModel.find({ commentId }).exec();
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
