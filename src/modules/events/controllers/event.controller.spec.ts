import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './event.controller';

describe('Controller', () => {
  let eventController: EventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
    }).compile();

    eventController = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(eventController).toBeDefined();
  });
});
