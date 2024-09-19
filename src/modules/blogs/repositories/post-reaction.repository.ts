import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  // Create or update a reaction for a blog post
  async createOrUpdate(
    togglePostReactionDto: TogglePostReactionDto,
  ): Promise<PostReaction> {
    const newReaction = new this.postReactionModel(togglePostReactionDto);
    return newReaction.save();
  }

  // Find all reactions for a specific post
  async findAllByPostId(postId: string): Promise<PostReaction[]> {
    return this.postReactionModel.find({ postId }).exec();
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
