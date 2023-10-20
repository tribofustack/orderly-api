import { IOrderRepository } from 'src/internal/domain/checkout/repositories/order.repository';
import { OrderItemModel } from './order-item-model';
import { OrderModel } from './order-model';
import { Order } from 'src/internal/domain/checkout/entities/order.entity';
import { OrderItem } from 'src/internal/domain/checkout/entities/order-item.entity';
import { InjectModel } from '@nestjs/sequelize';
import { orderStatusDto } from 'src/internal/domain/checkout/dto/order-status.dto';

export class OrderSequelizeRepository implements IOrderRepository {
  constructor(
    @InjectModel(OrderModel)
    private orderM: typeof OrderModel,
    @InjectModel(OrderItemModel)
    private orderItemM: typeof OrderItemModel,
  ) {}

  async changeStatus(orderId: string, status: string): Promise<void> {
    await this.orderM.update({ status }, { where: { id: orderId } });
  }

  async findOne(id: string): Promise<Order | null> {
    const orderModel = await this.orderM.findByPk(id, {
      include: [
        {
          model: OrderItemModel,
          as: 'orderItems',
        },
      ],
    });

    if (!orderModel) return null;

    const orderItems = orderModel.orderItems.map((item) => {
      return new OrderItem({
        id: item.id,
        value: Number(item.value),
        productId: item.productId,
        quantity: item.quantity,
      });
    });

    const order = new Order({
      id: orderModel.id,
      customerId: orderModel.customerId,
      orderItems,
    });
    order.updateStatus(orderModel.status as orderStatusDto);

    return order;
  }

  async findAll(
    customerIdQuery?: string,
    statusQuery?: string,
  ): Promise<Order[]> {
    const customerId = customerIdQuery ? { customerId: customerIdQuery } : {};
    const status = statusQuery ? { status: statusQuery } : {};
    const orderModels = await this.orderM.findAll({
      where: { ...customerId, ...status },
      include: [
        {
          model: OrderItemModel,
          as: 'orderItems',
        },
      ],
    });

    if (orderModels.length < 1) return [];

    return orderModels.map((om) => {
      const orderItems = om.orderItems.map((item) => {
        return new OrderItem({
          id: item.id,
          value: Number(item.value),
          productId: item.productId,
          quantity: item.quantity,
        });
      });
      const order = new Order({
        id: om.id,
        customerId: om.customerId,
        orderItems,
      });
      order.updateStatus(om.status as orderStatusDto);
      return order;
    });
  }

  async create(entity: Order): Promise<void> {
    const orderModel = await this.orderM.create({
      id: entity.id,
      customerId: entity.customerId,
      total: entity.total,
      status: entity.status,
    });

    await Promise.all(
      entity.orderItems.map(async (item) => {
        return this.orderItemM.create({
          id: item.id,
          productId: item.productId,
          orderId: orderModel.id,
          value: Number(item.value),
          quantity: item.quantity,
        });
      }),
    );
  }

  async delete(id: string): Promise<void> {
    await this.orderM.destroy({ where: { id } });
  }

  async update(id: string, { customerId }: Partial<Order>): Promise<void> {
    await this.orderM.update({ customerId }, { where: { id } });
  }
}
