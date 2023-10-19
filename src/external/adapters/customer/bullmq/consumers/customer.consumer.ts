import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { IHttp } from 'src/internal/application/ports/http/http';

import { CustomerCreatedEvent } from '../../../../../internal/domain/customers/events/customer-created.event';

@Processor('customers')
export class CustomerConsumer {
  constructor(
    @Inject('CustomerHttp')
    private customerHttp: IHttp,
  ) {}

  @Process('customer.created')
  async handle(job: Job<CustomerCreatedEvent>) {
    await this.customerHttp.post({
      body: { customer: job.data.customer },
    });
  }

  @OnQueueFailed({ name: 'customer.created' })
  handleError(error: Error) {
    console.error(`\n CustomerConsumer: ${error}`);
  }
}
