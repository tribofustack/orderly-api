import { Module } from '@nestjs/common';
import { OrderService } from './checkout.service';
import { OrderController } from './checkout.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderModel } from './entities/orders/order.model';
import { HttpModule } from '@nestjs/axios';
import { OrderGatewaySequelize } from './gateways/order-gateway-sequelize';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Module({
  imports: [SequelizeModule.forFeature([OrderModel])],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderGatewaySequelize,
    {
      provide: 'OrderPersistenceGateway',
      useExisting: OrderGatewaySequelize,
    },
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2
    }
  ],
})
export class OrderModule { }
