import { Order } from "../../checkout/entities/orders/order.entity";
import { Product } from "../entities/item/product.entity";

export class ProductCreatedEvent {
    constructor(
        public product: Product
    ) { }
}


export class OrderCreatedEvent {
    constructor(
        public order: Order
    ) { }
}