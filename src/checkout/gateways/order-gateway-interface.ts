import { Order } from "../entities/orders/order.entity";


export interface OrderGatewayInterface {
    create(order: Order): Promise<Order>;
    findAll(): Promise<Order[]>;
    findById(id: number): Promise<Order>;
    update(id: number, order: Order): Promise<Order>;
}