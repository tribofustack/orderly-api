import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from 'src/internal/domain/product/repositories/product.repository';

@Injectable()
export class DeleteProduct {
    constructor(
        @Inject('ProductRepository')
        private productRepository: IProductRepository,
    ) { }

    async execute(id: string): Promise<void> {
        await this.productRepository.delete(id);
    }
}
