import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/internal/domain/checkout/dto/create-order.dto';
import { OrderItem } from 'src/internal/domain/checkout/entities/order-item.entity';
import { Order } from 'src/internal/domain/checkout/entities/order.entity';
import { CreatedOrderEvent } from 'src/internal/domain/checkout/events/order-created.event';
import { IOrderRepository } from 'src/internal/domain/checkout/repositories/order.repository';
import { IIdentifierGenerator } from 'src/internal/application/ports/tokens/id-generator';
import { IEventEmitter } from '../../ports/events/event';

@Injectable()
export class CreateOrder {
    constructor(
        @Inject('OrderRepository')
        private orderRepository: IOrderRepository,

        @Inject('EventEmitter')
        private eventEmitter: IEventEmitter,

        @Inject('IdGenerator')
        private idGenerator: IIdentifierGenerator,
    ) { }

    async execute(createOrderDto: CreateOrderDto): Promise<Order> {
        const { products } = createOrderDto;

        const orderItems = products.map(product => {
            return new OrderItem({
                id: this.idGenerator.generate(),
                productId: product.id,
                quantity: product.quantity,
                value: product.price,
            });
        });

        const order = new Order({
            customerId: createOrderDto.customerId,
            id: this.idGenerator.generate(),
            orderItems,
            createdAt: new Date()
        });

        // await this.orderRepository.create(order);
        this.eventEmitter.emit('order.created', new CreatedOrderEvent(order));

        return order;
    }
}