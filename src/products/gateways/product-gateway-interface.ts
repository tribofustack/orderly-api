import { Product } from "../entities/item/product.entity";


export interface ProductGatewayInterface {
    create(product: Product): Promise<Product>;
    findAll(): Promise<Product[]>;
    findById(id: number): Promise<Product>;
    findByCategory(category: string): Promise<Product[]>;
    update(id: number, product: Product): Promise<Product>;
    delete(id: number): Promise<void>;
}