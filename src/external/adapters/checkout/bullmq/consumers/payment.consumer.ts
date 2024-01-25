import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CreatedPaymentEvent } from 'src/internal/domain/payment/events/payment-created.event';
import { PayOrder } from '../../../../../internal/application/useCases/checkout/pay-order.usecase';

@Processor('orders')
export class OrderConsumePayment {
  constructor(
    private readonly payOrder: PayOrder
  ) { }

  @Process('payment.created')
  async handle(job: Job<CreatedPaymentEvent>) {
    try {
      const { payment } = job.data;

      await this.payOrder.execute(payment);
    } catch (err: any) {
      console.error(`\n OrderConsumePayment: ${err.message}`);
    }
  }
}
