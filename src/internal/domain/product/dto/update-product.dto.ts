import { IProduct } from '../entities/product.entity';

export interface UpdateProductDto extends Partial<IProduct> {}
