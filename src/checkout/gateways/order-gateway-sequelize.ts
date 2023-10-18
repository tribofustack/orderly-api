import { InjectModel } from "@nestjs/sequelize";
import { Order } from "../entities/orders/order.entity";
import { OrderGatewayInterface } from "./order-gateway-interface";
import { OrderModel } from "../entities/orders/order.model";
import { Op } from "sequelize";


export class OrderGatewaySequelize implements OrderGatewayInterface {

    constructor(
        @InjectModel(OrderModel)
        private orderModel: typeof OrderModel
    ) { }


    async create(order: Order): Promise<Order> {
        const newOrder = await this.orderModel.create(order)
        return order
    }

    async findAll(): Promise<Order[]> {
        const ordersModels = await this.orderModel.findAll({
            where: {
                status: {
                    [Op.ne]: 'Finalizado'
                }
            },
            order: [
                ['id', 'ASC']
            ]
        });
        return ordersModels.map(
            (orderModel) => new Order(orderModel.name, orderModel.customer_id, orderModel.status, orderModel.items, orderModel.amount, orderModel.id),
        );
    }

    async findById(id: number): Promise<Order> {
        const orderModel = await this.orderModel.findByPk(id)
        return new Order(orderModel.name, orderModel.customer_id, orderModel.status, orderModel.items, orderModel.amount, orderModel.id)
    }

    async update(id: number, order: Order): Promise<Order> {
        await this.orderModel.update(order, {
            where: {
                id: id
            }
        });
        return order
    }


}