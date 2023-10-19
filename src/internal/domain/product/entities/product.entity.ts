import {
  AttributeException,
  DomainException,
} from 'src/internal/application/errors';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
}

export class Product implements IProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;

  constructor(product: IProduct) {
    this.validate(product);
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.category = product.category;
    this.price = product.price;
    this.quantity = product.quantity;
  }

  private validate(product: IProduct) {
    if (!product.id) throw new AttributeException('id not found.');
    if (!product.name) throw new AttributeException('name not found.');
    if (!product.description)
      throw new AttributeException('description not found.');
    if (!product.category) throw new AttributeException('category not found.');
    if (product.price < 0) throw new DomainException('price must be positive.');
    if (product.quantity < 0)
      throw new DomainException('quantity must be positive.');
  }
}
