import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModel } from './entities/item/product.model';
import { ProductGatewaySequelize } from './gateways/product-gateway-sequelize';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DecreaseProductListener } from './listeners/decrease-product.listeners';

@Module({
  imports: [SequelizeModule.forFeature([ProductModel])],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductGatewaySequelize,
    DecreaseProductListener,
    {
      provide: 'ProductPersistenceGateway',
      useExisting: ProductGatewaySequelize,
    },
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2
    }
  ],
})
export class ProductModule { }
