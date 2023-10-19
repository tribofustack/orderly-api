import { Product } from '../entities/product.entity';

export class ProductIncreasedEvent {
  constructor(public product: Product) {}
}
