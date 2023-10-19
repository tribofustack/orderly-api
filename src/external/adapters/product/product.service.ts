import { Inject, Injectable } from '@nestjs/common';
import { IIdentifierGenerator } from 'src/internal/application/ports/tokens/id-generator';
import { CreateProductDto } from 'src/internal/domain/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/internal/domain/product/dto/update-product.dto';
import { Product } from 'src/internal/domain/product/entities/product.entity';
import { IProductRepository } from 'src/internal/domain/product/repositories/product.repository';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('ProductRepository')
    private productRepository: IProductRepository,

    @Inject('IdGenerator')
    private idGenerator: IIdentifierGenerator,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // se um produto já existe ele adiciona quantidade
    const product = new Product({
      id: this.idGenerator.generate(),
      name: createProductDto.name,
      category: createProductDto.category,
      description: createProductDto.description,
      price: createProductDto.price,
      quantity: createProductDto.quantity,
    });
    await this.productRepository.create(product);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  async delete(id: string) {
    return this.productRepository.delete(id);
  }

  async findByCategory(category: string) {
    return this.productRepository.findByCategory(category);
  }
}
