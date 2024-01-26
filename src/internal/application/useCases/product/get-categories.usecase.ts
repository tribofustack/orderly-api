import { Inject, Injectable } from '@nestjs/common';
import { Category } from 'src/internal/domain/product/entities/category.entity';
import { IProductRepository } from 'src/internal/domain/product/repositories/product.repository';

@Injectable()
export class GetProductCategories {
    constructor(
        @Inject('ProductRepository')
        private productRepository: IProductRepository,
    ) { }

    async execute(): Promise<{ categories: Category[] }> {
        const categories = await this.productRepository.getCategories();
        return { categories }
    }
}
