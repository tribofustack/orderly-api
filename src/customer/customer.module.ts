import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerModel } from './entities/item/customer.model';
import { CustomerGatewaySequelize } from './gateways/customer-gateway-sequelize';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Module({
  imports: [SequelizeModule.forFeature([CustomerModel])],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    CustomerGatewaySequelize,
    {
      provide: 'CustomerPersistenceGateway',
      useExisting: CustomerGatewaySequelize,
    }
  ],
})
export class CustomerModule { }
