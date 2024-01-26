import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPayment } from 'src/internal/domain/payment/entities/payment.entity';
import { IOrderRepository } from 'src/internal/domain/checkout/repositories/order.repository';
import { DomainException } from 'src/internal/application/errors';
import { ChangedOrderStatusEvent } from 'src/internal/domain/checkout/events/order-status-changed.event';
import { IEventEmitter } from '../../ports/events/event';

@Injectable()
export class PayOrder {
    constructor(
        @Inject('OrderRepository')
        private orderRepository: IOrderRepository,

        @Inject('EventEmitter')
        private eventEmitter: IEventEmitter,
    ) { }

    async execute(payment: IPayment): Promise<void> {
        const order = await this.orderRepository.findOne(payment.orderId);
        if (!order) throw new NotFoundException('Order not found');

        if (order.status !== 'Recebido')
            throw new DomainException('Order status is invalid');

        if (payment.status !== 'Pendente de pagamento')
            throw new DomainException('Payment must be done');

        this.eventEmitter.emit(
            'order-status.changed',
            new ChangedOrderStatusEvent({
                orderId: order.id,
                status: 'Pendente de pagamento',
            }),
        );
    }
}