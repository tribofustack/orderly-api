import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrderRepository } from 'src/internal/domain/checkout/repositories/order.repository';
import { DomainException } from 'src/internal/application/errors';
import { ChangedOrderStatusEvent } from 'src/internal/domain/checkout/events/order-status-changed.event';
import { IEventEmitter } from '../../ports/events/event';

@Injectable()
export class PrepareOrder {
    constructor(
        @Inject('OrderRepository')
        private orderRepository: IOrderRepository,

        @Inject('EventEmitter')
        private eventEmitter: IEventEmitter,
    ) { }

    async execute(orderId: string): Promise<void> {
        const order = await this.orderRepository.findOne(orderId);
        if (!order) throw new NotFoundException('Order not found');

        if (order.status !== 'Pago')
            throw new DomainException('Order status is invalid');

        this.eventEmitter.emit(
            'order-status.changed',
            new ChangedOrderStatusEvent({ orderId, status: 'Em preparação' }),
        );

        console.log('Preparing...');
        setTimeout(() => {
            this.eventEmitter.emit(
                'order-status.changed',
                new ChangedOrderStatusEvent({ orderId, status: 'Pronto' }),
            );
        }, 20000);
    }
}