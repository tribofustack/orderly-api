import { Inject, Injectable } from '@nestjs/common';
import { UpdateProductDto } from 'src/internal/domain/product/dto/update-product.dto';
import { IProductRepository } from 'src/internal/domain/product/repositories/product.repository';

@Injectable()
export class UpdateProduct {
    constructor(
        @Inject('ProductRepository')
        private productRepository: IProductRepository,
    ) { }

    async execute(id: string, updateProductDto: UpdateProductDto): Promise<void> {
        await this.productRepository.update(id, updateProductDto);
    }
}
