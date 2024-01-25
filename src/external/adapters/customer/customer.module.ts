import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SequelizeModule } from '@nestjs/sequelize';
import { Uuid } from 'src/external/infra/tokens/uuid/uuid';

import { CustomerConsumer } from './bullmq/consumers/customer.consumer';
import { PublishCustomerListener } from './bullmq/listeners/publish-customer.listener';
import { CustomerController } from './customer.controller';
import { CustomerHttp } from './http/customer-http.adapter';
import { CustomerSequelizeRepository } from './sequelize/customer-sequelize.repository';
import { CustomerModel } from './sequelize/customer.model';
import { CreateCustomer } from '../../../internal/application/useCases/customer/create-customer.usecase';
import { FindCustomerByCpf } from '../../../internal/application/useCases/customer/find-by-cpf.usecase';
import { FindCustomerById } from '../../../internal/application/useCases/customer/find-by-id.usecase';


@Module({
  imports: [
    SequelizeModule.forFeature([CustomerModel]),
    HttpModule.register({
      baseURL: 'http://localhost:8000',
    }),
    BullModule.registerQueue({
      name: 'customers',
      defaultJobOptions: { attempts: 2 },
    }),
  ],
  controllers: [CustomerController],
  providers: [
    CustomerSequelizeRepository,
    { provide: 'CustomerRepository', useExisting: CustomerSequelizeRepository },
    CustomerHttp,
    { provide: 'CustomerHttp', useExisting: CustomerHttp },
    CustomerConsumer,
    PublishCustomerListener,
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
    Uuid,
    { provide: 'IdGenerator', useExisting: Uuid },
    CreateCustomer,
    FindCustomerByCpf,
    FindCustomerById
  ],
})
export class CustomerModule { }
