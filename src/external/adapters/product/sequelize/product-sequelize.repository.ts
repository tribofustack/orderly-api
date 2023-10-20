import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'src/internal/domain/product/entities/product.entity';
import { IProductRepository } from 'src/internal/domain/product/repositories/product.repository';
import { ProductModel } from './product.model';
import { NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';

export class ProductSequelizeRepository implements IProductRepository {
  constructor(
    @InjectModel(ProductModel)
    private model: typeof ProductModel,
  ) {}

  async updateQuantity(id: string, quantity: number): Promise<number> {
    await this.model.update({ quantity }, { where: { id } });
    return quantity;
  }

  async findByCategory(category: string): Promise<Product[]> {
    const productModel = await this.model.findAll({
      where: { category: { [Op.iLike]: category } },
    });
    if (!productModel)
      throw new NotFoundException('product category not exists.');

    return productModel.map((pm) => {
      return new Product({
        id: pm.id,
        category: pm.category,
        description: pm.description,
        name: pm.name,
        price: Number(pm.price),
        quantity: pm.quantity,
      });
    });
  }

  async findOne(id: string): Promise<Product> {
    const productModel = await this.model.findOne({ where: { id } });
    if (!productModel) throw new NotFoundException('product id not exists.');

    return new Product({
      id: productModel.id,
      category: productModel.category,
      description: productModel.description,
      name: productModel.name,
      price: productModel.price,
      quantity: productModel.quantity,
    });
  }

  async findAll(): Promise<Product[]> {
    const productsModel = await this.model.findAll();

    return productsModel.map((p) => {
      return new Product({
        id: p.id,
        name: p.name,
        category: p.category,
        description: p.description,
        price: p.price,
        quantity: p.quantity,
      });
    });
  }

  async create(params: Partial<Product>): Promise<Product> {
    const productModel = await this.model.create(params);

    return new Product({
      id: productModel.id,
      category: productModel.category,
      description: productModel.description,
      name: productModel.name,
      price: productModel.price,
      quantity: productModel.quantity,
    });
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }

  async update(
    id: string,
    { name, price, description, category }: Partial<Product>,
  ): Promise<void> {
    await this.model.update(
      { name, price, description, category },
      { where: { id } },
    );
  }
}
