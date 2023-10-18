import { Order } from "../entities/orders/order.entity";

export class OrderCreatedEvent {
    constructor(
        public order: Order
    ) { }
}