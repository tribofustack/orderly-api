import { IRepository } from 'src/internal/application/ports/repositories/repository';

import { Product } from '../entities/product.entity';

export interface IProductRepository extends IRepository<Product> {
  findByCategory(category: string): Promise<Product[]>;
  updateQuantity(id: string, quantity: number): Promise<number>;
}
