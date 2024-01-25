import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CreatedOrderEvent } from 'src/internal/domain/checkout/events/order-created.event';
import { CreatePayment } from '../../../../../internal/application/useCases/payment/create-payment.usecase';

@Processor('payments')
export class PaymentConsumeOrder {
  constructor(
    private readonly createPayment: CreatePayment
  ) { }

  @Process('payment.requested')
  async handle(job: Job<CreatedOrderEvent>) {
    try {
      const { order } = job.data;

      await this.createPayment.execute(order);
    } catch (err: any) {
      console.log(err);
      console.error('\n PaymentConsumeOrder: ', err.message);
    }
  }
}
