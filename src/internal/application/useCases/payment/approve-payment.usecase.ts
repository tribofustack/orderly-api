import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPaymentRepository } from 'src/internal/domain/payment/repositories/payment.repository';
import { ChangedPaymentStatusEvent } from 'src/internal/domain/payment/events/payment-status-changed.event';
import { ChangedOrderStatusEvent } from 'src/internal/domain/checkout/events/order-status-changed.event';
import { IEventEmitter } from '../../ports/events/event';

@Injectable()
export class ApprovePaymentByOrderId {
    constructor(
        @Inject('PaymentRepository')
        private paymentRepository: IPaymentRepository,

        @Inject('EventEmitter')
        private eventEmitter: IEventEmitter,
    ) { }

    async execute(orderId: string): Promise<void> {
        const payment = await this.paymentRepository.findOneByOrderId(orderId);
        if (!payment) throw new NotFoundException('Payment not found');

        console.log('Paying...');

        setTimeout(() => {
            this.eventEmitter.emit(
                'payment-status.changed',
                new ChangedPaymentStatusEvent({
                    paymentId: payment.id,
                    status: 'Aprovado',
                }),
            );
            this.eventEmitter.emit(
                'order-status.changed',
                new ChangedOrderStatusEvent({
                    orderId,
                    status: 'Pago',
                }),
            );

            console.log('Paid.');
        }, 20000);
    }
}
