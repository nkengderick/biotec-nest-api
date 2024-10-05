import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  PostReaction,
  PostReactionDocument,
} from '../schemas/post-reaction.schema';
import { TogglePostReactionDto } from '../dto/toggle-post-reaction.dto';

@Injectable()
export class PostReactionRepository {
  constructor(
    @InjectModel(PostReaction.name)
    private postReactionModel: Model<PostReactionDocument>,
  ) {}

  // Helper function to ensure string IDs are converted to ObjectId
  private toObjectId(id: string | Types.ObjectId): Types.ObjectId {
    return typeof id === 'string' ? new Types.ObjectId(id) : id;
  }

    // Helper function to update all userId fields to ObjectIds in the collection
  private async ensureUserIdsAreObjectIds(): Promise<void> {
    await this.postReactionModel.updateMany(
      { userId: { $type: 'string' } },  // find documents where userId is still a string
      [{ $set: { userId: { $toObjectId: '$userId' } } }] // convert userId to ObjectId
    ).exec();
  }

  // Create or update a reaction for a blog post
  async createOrUpdate(
    togglePostReactionDto: TogglePostReactionDto,
  ): Promise<PostReaction> {
    togglePostReactionDto.userId = this.toObjectId(togglePostReactionDto.userId);
    const newReaction = new this.postReactionModel(togglePostReactionDto);
    return newReaction.save();
  }

  // Find all reactions for a specific post
  async findAllByPostId(postId: string): Promise<PostReaction[]> {
    await this.ensureUserIdsAreObjectIds();
    return this.postReactionModel.find({ postId }).populate('userId').exec();
  }

  // Find a reaction by post ID and user ID
  async findByPostIdAndUserId(
    postId: string,
    userId: string,
  ): Promise<any | null> {
    return this.postReactionModel.findOne({ postId, userId }).exec();
  }

  // Update reaction type by ID
  async updateReactionType(
    id: string,
    reactionType: string,
  ): Promise<PostReaction> {
    return this.postReactionModel
      .findByIdAndUpdate(id, { reactionType }, { new: true })
      .exec();
  }

  // Delete a reaction by ID
  async delete(id: string): Promise<PostReaction> {
    return this.postReactionModel.findByIdAndDelete(id).exec();
  }
}
