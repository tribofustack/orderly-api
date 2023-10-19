import { IProduct } from '../entities/product.entity';

export interface CreateProductDto extends Partial<IProduct> {}
