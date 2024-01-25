import { Module } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SequelizeModule } from '@nestjs/sequelize';
import { Uuid } from 'src/external/infra/tokens/uuid/uuid';

import { DecrementProductListener } from './listeners/decrement-product.listener';
import { ProductController } from './product.controller';
import { ProductSequelizeRepository } from './sequelize/product-sequelize.repository';
import { ProductModel } from './sequelize/product.model';
import { CategoryModel } from './sequelize/category.model';
import { CategorySeeder } from './sequelize/seeders/category-seeder';
import { CreateProduct } from '../../../internal/application/useCases/product/create-product.usecase';
import { DeleteProduct } from '../../../internal/application/useCases/product/delete-product.usecase';
import { FindProductsByCategory } from '../../../internal/application/useCases/product/find-by-category.usecase';
import { GetProductCategories } from '../../../internal/application/useCases/product/get-categories.usecase';
import { UpdateProduct } from '../../../internal/application/useCases/product/update-product.usecase';

@Module({
  imports: [SequelizeModule.forFeature([ProductModel, CategoryModel])],
  controllers: [ProductController],
  providers: [
    ProductSequelizeRepository,
    DecrementProductListener,
    { provide: 'ProductRepository', useExisting: ProductSequelizeRepository },
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
    Uuid,
    { provide: 'IdGenerator', useExisting: Uuid },
    CategorySeeder,
    CreateProduct,
    DeleteProduct,
    FindProductsByCategory,
    GetProductCategories,
    UpdateProduct
  ],
})
export class ProductModule { }
