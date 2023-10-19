import { Order } from '../entities/order.entity';

export class CreatedOrderEvent {
  constructor(public order: Order) {}
}
