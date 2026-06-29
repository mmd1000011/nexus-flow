import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPublisher } from './event-store/event-publisher.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly eventPublisher: EventPublisher, 
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('events')
  async publishEvent(
    @Body() body: { type: string; payload: Record<string, any> },
  ) {
    return this.eventPublisher.publish(body.type, body.payload);
  }
 
  @Get('events')
  async getEvents() {
    return this.eventPublisher.getAllEvents();
  }
}