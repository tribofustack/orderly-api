import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/internal/domain/product/dto/create-product.dto';
import { Product } from 'src/internal/domain/product/entities/product.entity';
import { IProductRepository } from 'src/internal/domain/product/repositories/product.repository';
import { IIdentifierGenerator } from 'src/internal/application/ports/tokens/id-generator';

@Injectable()
export class CreateProduct {
    constructor(
        @Inject('ProductRepository')
        private productRepository: IProductRepository,

        @Inject('IdGenerator')
        private idGenerator: IIdentifierGenerator,
    ) { }

    async execute(createProductDto: CreateProductDto): Promise<Product> {
        const product = new Product({
            id: this.idGenerator.generate(),
            name: createProductDto.name,
            categoryId: createProductDto.categoryId,
            description: createProductDto.description,
            price: createProductDto.price,
            quantity: createProductDto.quantity,
        });

        await this.productRepository.create(product);
        return product;
    }
}