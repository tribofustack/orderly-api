import { InjectModel } from "@nestjs/sequelize";
import { Product } from "../entities/item/product.entity";
import { ProductGatewayInterface } from "./product-gateway-interface";
import { ProductModel } from "../entities/item/product.model";


export class ProductGatewaySequelize implements ProductGatewayInterface {

    constructor(
        @InjectModel(ProductModel)
        private productModel: typeof ProductModel
    ) { }

    async create(product: Product): Promise<Product> {
        const newProduct = await this.productModel.create(product)
        return product
    }

    async findAll(): Promise<Product[]> {
        const productModels = await this.productModel.findAll();
        return productModels.map(
            (productModel) => new Product(productModel.name, productModel.order_item_id, productModel.description, productModel.category, productModel.price, productModel.quantity, productModel.id),
        );
    }

    async findById(id: number): Promise<Product> {
        const productModel = await this.productModel.findByPk(id)
        return new Product(productModel.order_item_id, productModel.name, productModel.description, productModel.category, productModel.price, productModel.quantity, productModel.id)
    }

    async update(id: number, product: Product): Promise<Product> {
        await this.productModel.update(product, {
            where: {
                id: id
            }
        });
        return product
    }

    async delete(id: number): Promise<void> {
        await this.productModel.destroy({
            where: {
                id: id
            }
        });
    }

    async findByCategory(category: string): Promise<Product[]> {

        const productModels = await this.productModel.findAll({
            where: {
                category: category
            }
        })

        return productModels.map(
            (productModel) => new Product(productModel.name, productModel.order_item_id, productModel.description, productModel.category, productModel.price, productModel.quantity, productModel.id),
        );
    }

}