import { Inject, Injectable } from '@nestjs/common';
import { IOrder } from 'src/internal/domain/checkout/entities/order.entity';
import { Payment } from 'src/internal/domain/payment/entities/payment.entity';
import { IPaymentRepository } from 'src/internal/domain/payment/repositories/payment.repository';
import { IPaymentIntegration } from 'src/internal/application/ports/integrations/payment';
import { IIdentifierGenerator } from 'src/internal/application/ports/tokens/id-generator';
import { CreatedPaymentEvent } from 'src/internal/domain/payment/events/payment-created.event';
import { DomainException } from 'src/internal/application/errors';
import { IEventEmitter } from '../../ports/events/event';

@Injectable()
export class CreatePayment {
    constructor(
        @Inject('PaymentRepository')
        private paymentRepository: IPaymentRepository,

        @Inject('PaymentIntegration')
        private paymentIntegration: IPaymentIntegration,

        @Inject('EventEmitter')
        private eventEmitter: IEventEmitter,

        @Inject('IdGenerator')
        private idGenerator: IIdentifierGenerator,
    ) { }

    async execute(order: IOrder): Promise<void> {
        const payment = new Payment({
            id: this.idGenerator.generate(),
            customerId: order.customerId,
            orderId: order.id,
            value: order.total,
        });

        const { qrCode, status, url } = await this.paymentIntegration.createPayment({
            value: payment.value,
            paymentType: 'pix',
        });

        if (status !== 'pending')
            throw new DomainException('Payment was cancelled');

        payment.setQrCode(qrCode);
        payment.setUrl(url);
        payment.changeStatus('Pendente de pagamento');

        await this.paymentRepository.create(payment);

        this.eventEmitter.emit('payment.created', new CreatedPaymentEvent(payment));
    }
}
