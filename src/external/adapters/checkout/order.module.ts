import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SequelizeModule } from '@nestjs/sequelize';
import { Uuid } from 'src/external/infra/tokens/uuid/uuid';

import { OrderConsumer } from './bullmq/consumers/order.consumer';
import { ChangeOrderStatusListener } from './bullmq/listeners/change-order-status.listener';
import { PublishOrderRequestListener } from './bullmq/listeners/publish-order-request.listener';
import { OrderController } from './order.controller';
import { OrdersService } from './order.service';
import { OrderItemModel } from './sequelize/order-item-model';
import { OrderModel } from './sequelize/order-model';
import { OrderSequelizeRepository } from './sequelize/order-sequelize.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([OrderModel, OrderItemModel]),
    BullModule.registerQueue({
      name: 'orders',
      defaultJobOptions: { attempts: 2 },
    }),
  ],
  controllers: [OrderController],
  providers: [
    OrdersService,
    OrderSequelizeRepository,
    { provide: 'OrderRepository', useExisting: OrderSequelizeRepository },
    PublishOrderRequestListener,
    ChangeOrderStatusListener,
    OrderConsumer,
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
    Uuid,
    { provide: 'IdentifierGenerator', useExisting: Uuid },
  ],
})
export class OrderModule {}
