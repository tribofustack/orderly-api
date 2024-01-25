import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SequelizeModule } from '@nestjs/sequelize';
import { Uuid } from 'src/external/infra/tokens/uuid/uuid';

import { ProductSequelizeRepository } from '../product/sequelize/product-sequelize.repository';
import { ProductModel } from '../product/sequelize/product.model';
import { OrderConsumer } from './bullmq/consumers/order.consumer';
import { ChangeOrderStatusListener } from './bullmq/listeners/change-order-status.listener';
import { PublishOrderRequestListener } from './bullmq/listeners/publish-order-request.listener';
import { OrderController } from './order.controller';
import { OrderItemModel } from './sequelize/order-item-model';
import { OrderModel } from './sequelize/order-model';
import { OrderSequelizeRepository } from './sequelize/order-sequelize.repository';
import QueueModule from 'src/external/infra/queue';
import { OrderConsumePayment } from './bullmq/consumers/payment.consumer';
import { CustomerModel } from '../customer/sequelize/customer.model';
import { CategoryModel } from '../product/sequelize/category.model';
import { CustomerSequelizeRepository } from '../customer/sequelize/customer-sequelize.repository';
import { FindCustomerById } from '../../../internal/application/useCases/customer/find-by-id.usecase';
import { VerifyProductQuantity } from '../../../internal/application/useCases/product/verify-product-quantity.usecase';
import { CreateOrder } from '../../../internal/application/useCases/checkout/create-order.usecase';
import { PrepareOrder } from '../../../internal/application/useCases/checkout/prepare-order.usecase';
import { WithdrawnOrder } from '../../../internal/application/useCases/checkout/withdraw-order-usecase';
import { FindAllOrders } from '../../../internal/application/useCases/checkout/find-all-orders.usecase';
import { GetOrderStatus } from '../../../internal/application/useCases/checkout/get-order-status.usecase';
import { GetCustomerReport } from '../../../internal/application/useCases/checkout/get-customer-report.usecase';
import { PayOrder } from '../../../internal/application/useCases/checkout/pay-order.usecase';

@Module({
  imports: [
    SequelizeModule.forFeature([OrderModel,
      OrderItemModel,
      ProductModel,
      CustomerModel,
      CategoryModel,
    ]),
    QueueModule,
  ],
  controllers: [OrderController],
  providers: [
    ProductSequelizeRepository,
    OrderSequelizeRepository,
    CustomerSequelizeRepository,
    PublishOrderRequestListener,
    ChangeOrderStatusListener,
    OrderConsumer,
    OrderConsumePayment,
    Uuid,
    FindCustomerById,
    VerifyProductQuantity,
    CreateOrder,
    PrepareOrder,
    WithdrawnOrder,
    FindAllOrders,
    GetOrderStatus,
    GetCustomerReport,
    PayOrder,
    { provide: 'ProductRepository', useExisting: ProductSequelizeRepository },
    { provide: 'OrderRepository', useExisting: OrderSequelizeRepository },
    { provide: 'CustomerRepository', useExisting: CustomerSequelizeRepository },
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
    { provide: 'IdGenerator', useExisting: Uuid },
  ],
})
export class OrderModule { }
