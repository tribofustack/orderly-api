import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bull';
import { CustomerCreatedEvent } from 'src/internal/domain/customers/events/customer-created.event';

@Injectable()
export class PublishCustomerListener {
  constructor(
    @InjectQueue('customers')
    private queue: Queue,
  ) {}

  @OnEvent('customer.created')
  async handle(event: CustomerCreatedEvent) {
    await this.queue.add('customer.created', event);
  }
}
