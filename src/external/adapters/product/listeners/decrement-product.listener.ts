import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { DomainException } from 'src/internal/application/errors';
import { CreatedOrderEvent } from 'src/internal/domain/checkout/events/order-created.event';
import { IProductRepository } from 'src/internal/domain/product/repositories/product.repository';

@Injectable()
export class DecrementProductListener {
  constructor(
    @Inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  @OnEvent('order.created')
  async handle(event: CreatedOrderEvent) {
    const { orderItems } = event.order;

    await Promise.all(
      orderItems.map(async item => {
        const product = await this.productRepository.findOne(item.productId);
        const quantity = product.quantity - item.quantity;
        const isEnough = quantity >= 0;
        if (!isEnough)
          throw new DomainException('product quantity is not enough.');

        await this.productRepository.updateQuantity(item.productId, quantity);
      }),
    );
  }
}
