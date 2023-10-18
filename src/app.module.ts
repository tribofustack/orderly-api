import { Module } from '@nestjs/common';
import { OrderModule } from './checkout/checkout.module';
import { ProductModule } from './products/product.module';
import { CustomerModule } from './customer/customer.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderModel } from './checkout/entities/orders/order.model';
import { ProductModel } from './products/entities/item/product.model';
import { CustomerModel } from './customer/entities/item/customer.model';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    OrderModule,
    ProductModule,
    CustomerModule,
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: +configService.get<number>('DATABASE_PORT', 8000), // Pode-se usar um valor padrão como 5432
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadModels: true,
        models: [OrderModel, ProductModel, CustomerModel]
      }),
      inject: [ConfigService],
    })
  ]
})
export class AppModule { }