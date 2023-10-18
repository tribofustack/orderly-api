import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/order/create-order.dto';
import { OrderGatewayInterface } from './gateways/order-gateway-interface';
import { Order } from './entities/orders/order.entity';
import EventEmitter from 'events';
import { OrderCreatedEvent } from './events/order-created.event';
import { UpdateOrderDto } from './dto/order/update-order.dto';

@Injectable()
export class OrderService {

  constructor(
    @Inject('OrderPersistenceGateway')
    private orderPersistenceGateway: OrderGatewayInterface,
    @Inject('EventEmitter')
    private eventEmitter: EventEmitter

  ) { }



  async create(createOrderDto: CreateOrderDto) {
    const order = new Order(createOrderDto.name, createOrderDto.customer_id, createOrderDto.status, createOrderDto.items, createOrderDto.amount);
    await this.orderPersistenceGateway.create(order);

    this.eventEmitter.emit('order.created', new OrderCreatedEvent(order));

    return order;
  }

  findAll() {
    return this.orderPersistenceGateway.findAll();
  }

  findOne(id: number) {
    return this.orderPersistenceGateway.findById(id);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {

    const order = new Order(
      updateOrderDto.name,
      updateOrderDto.customer_id,
      updateOrderDto.status,
      updateOrderDto.items,
      updateOrderDto.amount
    );

    await this.orderPersistenceGateway.update(id, order);

    return this.findOne(id);
  }

  remove(id: number) {
    // return `This action removes a #${id} order`;
  }
}
