import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bull';
import { CreatedOrderEvent } from 'src/internal/domain/checkout/events/order-created.event';

@Injectable()
export class PublishOrderRequestListener {
  constructor(
    @InjectQueue('orders')
    private queue: Queue,
  ) {}

  @OnEvent('order.created')
  async handle(event: CreatedOrderEvent) {
    await this.queue.add('order.requested', event);
  }
}
