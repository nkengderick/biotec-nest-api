import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentReactionRepository } from '../repositories/comment-reaction.repository';
import { ToggleCommentReactionDto } from '../dto/toggle-comment-reaction.dto';
import { CommentReaction } from '../schemas/comment-reaction.schema';
import { UserRepository } from 'src/modules/user-management/repositories/user.repository';

@Injectable()
export class ToggleCommentReactionUseCase {
  constructor(
    private readonly commentReactionRepository: CommentReactionRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    toggleCommentReactionDto: ToggleCommentReactionDto,
  ): Promise<CommentReaction | null> {
    const { commentId, userId, reactionType, remove } =
      toggleCommentReactionDto;

    // Fetch and validate the user
    const userExists = await this.userRepository.findById(userId.toString());

    if (!userExists) {
      throw new NotFoundException(`User with ID ${userId} does not exist`);
    }

    // Find if the user has already reacted to the comment
    const existingReaction =
      await this.commentReactionRepository.findByCommentIdAndUserId(
        commentId.toString(),
        userId.toString(),
      );

    // If a reaction exists and the user wants to remove it
    if (existingReaction && remove) {
      await this.commentReactionRepository.delete(existingReaction._id);
      return null; // No reaction after removal
    }

    // If a reaction exists but the type differs, switch the reaction type
    if (existingReaction && existingReaction.reactionType !== reactionType) {
      return this.commentReactionRepository.updateReactionType(
        existingReaction._id,
        reactionType,
      );
    }

    // If no reaction exists, create a new one
    if (!existingReaction) {
      return this.commentReactionRepository.createOrUpdate(
        toggleCommentReactionDto,
      );
    }

    return existingReaction; // Return the existing reaction if no changes were made
  }
}
