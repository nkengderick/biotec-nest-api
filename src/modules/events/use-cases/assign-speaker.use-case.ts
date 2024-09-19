import { Injectable, NotFoundException } from '@nestjs/common';
import { EventSpeakerRepository } from '../repositories/event-speaker.repository';
import { AssignSpeakerDto } from '../dto/assign-speaker.dto';
import { EventSpeaker } from '../schemas/event-speaker.schema';
import { MemberRepository } from 'src/modules/user-management/repositories/member.repository';
import { EventRepository } from '../repositories/event.repository';

@Injectable()
export class AssignSpeakerUseCase {
  constructor(
    private readonly eventSpeakerRepository: EventSpeakerRepository,
    private readonly memberRepository: MemberRepository,
    private readonly eventRepository: EventRepository,
  ) {}

  async execute(assignSpeakerDto: AssignSpeakerDto): Promise<EventSpeaker> {
    // Check if the member exists
    const member = await this.memberRepository.findById(
      assignSpeakerDto.memberId,
    );
    if (!member) {
      throw new NotFoundException(
        `Member with ID ${assignSpeakerDto.memberId} not found`,
      );
    }
    
    // Check if the member exists
    const event = await this.eventRepository.findById(
      assignSpeakerDto.eventId,
    );
    if (!event) {
      throw new NotFoundException(
        `Event with ID ${assignSpeakerDto.eventId} not found`,
      );
    }

    // Assign the speaker if the member is valid
    return this.eventSpeakerRepository.assignSpeaker(assignSpeakerDto);
  }
}
