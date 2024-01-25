import { Inject, Injectable } from '@nestjs/common';
import { Product } from 'src/internal/domain/product/entities/product.entity';
import { IProductRepository } from 'src/internal/domain/product/repositories/product.repository';

@Injectable()
export class FindProductsByCategory {
    constructor(
        @Inject('ProductRepository')
        private productRepository: IProductRepository,
    ) { }

    async execute(categoryId: string): Promise<Product[]> {
        return await this.productRepository.findByCategory(categoryId);
    }
}
