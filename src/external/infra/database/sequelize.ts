import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { OrderItemModel } from 'src/external/adapters/checkout/sequelize/order-item-model';
import { OrderModel } from 'src/external/adapters/checkout/sequelize/order-model';
import { CustomerModel } from 'src/external/adapters/customer/sequelize/customer.model';
import { ProductModel } from 'src/external/adapters/product/sequelize/product.model';

import { connection } from './connections';

export const sequelizeModels = [
  CustomerModel,
  ProductModel,
  OrderModel,
  OrderItemModel,
];

export const sequelizeModule = SequelizeModule.forRoot({
  ...connection,
  models: sequelizeModels,
} as SequelizeModuleOptions);
