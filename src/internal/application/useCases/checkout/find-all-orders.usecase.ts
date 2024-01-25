import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from 'src/internal/domain/checkout/repositories/order.repository';
import { Order } from 'src/internal/domain/checkout/entities/order.entity';

@Injectable()
export class FindAllOrders {
    constructor(
        @Inject('OrderRepository')
        private orderRepository: IOrderRepository,
    ) { }

    async execute(customerId?: string, status?: string): Promise<Order[]> {
        return this.orderRepository.findAllWithoutFinishedAndOrderedByStatusAndCreateDate(customerId, status);
    }
}