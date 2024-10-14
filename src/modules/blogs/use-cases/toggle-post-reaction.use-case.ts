import { Injectable, NotFoundException } from '@nestjs/common';
import { PostReactionRepository } from '../repositories/post-reaction.repository';
import { TogglePostReactionDto } from '../dto/toggle-post-reaction.dto';
import { PostReaction } from '../schemas/post-reaction.schema';
import { UserRepository } from 'src/modules/user-management/repositories/user.repository';

@Injectable()
export class TogglePostReactionUseCase {
  constructor(
    private readonly postReactionRepository: PostReactionRepository,
    private readonly userRepository: UserRepository, // Inject UserRepository
  ) {}

  async execute(
    togglePostReactionDto: TogglePostReactionDto,
  ): Promise<PostReaction | null> {
    const { postId, userId, reactionType, remove } = togglePostReactionDto;

    // Fetch and validate the user
    const userExists = await this.userRepository.findById(userId.toString());

    if (!userExists) {
      throw new NotFoundException(`User with ID ${userId} does not exist`);
    }

    // Find if the user has already reacted to the post
    const existingReaction =
      await this.postReactionRepository.findByPostIdAndUserId(
        postId.toString(),
        userId.toString(),
      );

    // If a reaction exists and the user wants to remove it
    if (existingReaction) {
      await this.postReactionRepository.delete(existingReaction._id);
      return null; // No reaction after removal
    }

    // If a reaction exists but the type differs, switch the reaction type
    if (existingReaction && existingReaction.reactionType !== reactionType) {
      return this.postReactionRepository.updateReactionType(
        existingReaction._id,
        reactionType,
      );
    }

    // If no reaction exists, create a new one
    if (!existingReaction) {
      return this.postReactionRepository.createOrUpdate(togglePostReactionDto);
    }

    return existingReaction; // Return the existing reaction if no changes were made
  }
}
