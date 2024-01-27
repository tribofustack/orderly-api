import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { ProductModel } from '../../product/sequelize/product.model';
import { OrderModel } from './order-model';

interface IOrderItemModel {
  id: string;
  productId: string;
  orderId: string;
  value: number;
  quantity: number;
}

@Table({
  tableName: 'order-items',
  timestamps: false,
})
class OrderItemModel extends Model implements IOrderItemModel {
  @Column({
    field: 'id',
    primaryKey: true,
    unique: true,
    allowNull: false,
    type: DataType.STRING,
  })
  declare id: string;

  @ForeignKey(() => ProductModel)
  @Column({
    field: 'product_id',
    allowNull: false,
    type: DataType.STRING,
  })
  declare productId: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @ForeignKey(() => OrderModel)
  @Column({
    field: 'order_id',
    allowNull: false,
    type: DataType.STRING,
  })
  declare orderId: string;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;

  @Column({
    field: 'value',
    allowNull: false,
    type: DataType.DECIMAL(10, 2),
  })
  declare value: number;

  @Column({
    field: 'quantity',
    allowNull: false,
    type: DataType.INTEGER,
  })
  declare quantity: number;
}

export { OrderItemModel };
