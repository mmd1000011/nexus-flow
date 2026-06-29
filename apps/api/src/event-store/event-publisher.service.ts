import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { EventStoreEntity } from './event-store.entity';

@Injectable()
export class EventPublisher {
  constructor(
    @InjectRepository(EventStoreEntity)
    private readonly eventRepository: Repository<EventStoreEntity>,
  ) {}

  async publish(type: string, payload: Record<string, any>) {
    const event = this.eventRepository.create({
      id: uuidv4(),
      type: type,
      payload: payload,
    });

    return await this.eventRepository.save(event);
  }
  async getAllEvents() {
    return this.eventRepository.find({
      order: {
        timestamp: 'DESC',
      },
    });
  }
}