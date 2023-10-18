import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/item/create-product.dto';
import { UpdateProductDto } from './dto/item/update-product.dto';
import { ProductGatewayInterface } from './gateways/product-gateway-interface';
import { Product } from './entities/item/product.entity';

@Injectable()
export class ProductService {

  constructor(
    @Inject('ProductPersistenceGateway')
    private productPersistenceGateway: ProductGatewayInterface,

  ) { }



  async create(createProductDto: CreateProductDto) {
    const product = new Product(createProductDto.order_item_id, createProductDto.name, createProductDto.description, createProductDto.category, createProductDto.price, createProductDto.quantity);
    await this.productPersistenceGateway.create(product);

    return product;
  }

  findAll() {
    return this.productPersistenceGateway.findAll();
  }

  findOne(id: number) {
    return this.productPersistenceGateway.findById(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = new Product(
      updateProductDto.order_item_id,
      updateProductDto.name,
      updateProductDto.description,
      updateProductDto.category,
      updateProductDto.price,
      updateProductDto.quantity
    );

    await this.productPersistenceGateway.update(id, product);

    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.productPersistenceGateway.delete(id);
  }

  async findByCategory(category: string): Promise<Product[]> {
    return this.productPersistenceGateway.findByCategory(category);
  }
}
