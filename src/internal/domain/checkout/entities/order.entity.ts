import {
  AttributeException,
  DomainException,
} from 'src/internal/application/errors';

import { orderStatusDto } from '../dto/order-status.dto';
import { IOrderItem } from './order-item.entity';

export interface IOrder {
  id: string;
  customerId: string;
  total: number;
  status: orderStatusDto;
  orderItems: Array<IOrderItem>;
  createdAt?: Date;
}
type IConstructorDto = Omit<IOrder, 'total' | 'status'>;

export class Order implements IOrder {
  id: string;
  customerId: string;
  total: number;
  status: orderStatusDto;
  orderItems: Array<IOrderItem>;
  createdAt: Date;

  constructor(order: IConstructorDto) {
    this.validate(order);

    this.id = order.id;
    this.customerId = order.customerId;
    this.orderItems = order.orderItems;
    this.status = 'Recebido';
    this.total = this.sumTotal(this.orderItems);
    this.createdAt = this.createOrderDate(order.createdAt)
  }

  private validate(order: IConstructorDto) {
    if (!order.id) throw new AttributeException('id not found.');

    if (!order.customerId) throw new DomainException('customerId is required.');

    if (order.orderItems.length < 1)
      throw new DomainException('items are required.');
  }

  private sumTotal(orderItems: Array<IOrderItem>) {
    return orderItems.reduce((prev, curr) => prev + curr.total, 0);
  }

  private createOrderDate(date: Date | null): Date {
    return date ? new Date(date) : new Date()
  }

  updateStatus(status: orderStatusDto) {
    this.status = status;
  }
}
