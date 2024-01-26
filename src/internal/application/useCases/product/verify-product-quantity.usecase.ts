import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { VerifyProductDto } from 'src/internal/domain/product/dto/verify-product.dto';
import { IProductRepository } from 'src/internal/domain/product/repositories/product.repository';
import { DomainException } from 'src/internal/application/errors';
import { ProductDecreasedEvent } from 'src/internal/domain/product/events/product-decreased.event';
import { IEventEmitter } from '../../ports/events/event';

@Injectable()
export class VerifyProductQuantity {
    constructor(
        @Inject('ProductRepository')
        private productRepository: IProductRepository,

        @Inject('EventEmitter')
        private eventEmitter: IEventEmitter,
    ) { }

    async execute(products: VerifyProductDto[]): Promise<void> {
        const productVerified = [];
        for (const p of products) {
            const product = await this.productRepository.findOne(p.id);
            if (!product) throw new NotFoundException('Product not found.');

            const quantity = product.quantity - p.quantity;
            if (quantity < 0) throw new DomainException('Product quantity is not enough.');

            productVerified.push({ id: product.id, quantity, value: product.price });
        }

        this.eventEmitter.emit(
            'product.verified',
            new ProductDecreasedEvent(productVerified),
        );
    }
}
