import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from 'src/internal/domain/product/repositories/product.repository';

@Injectable()
export class GetProductCategories {
    constructor(
        @Inject('ProductRepository')
        private productRepository: IProductRepository,
    ) { }

    async execute(): Promise<any> {
        const categories = await this.productRepository.getCategories();
        return { categories }
    }
}
