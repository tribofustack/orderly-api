import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript'

export type ProductAttributes = {
    id?: number;
    order_item_id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    quantity: number;
}

@Table({ tableName: 'products' })
export class ProductModel extends Model<ProductAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    order_item_id: string | null;

    @Column(DataType.STRING)
    name: string;

    @Column(DataType.STRING)
    description: string;

    @Column(DataType.STRING)
    category: string;

    @Column(DataType.FLOAT)
    price: number;

    @Column(DataType.INTEGER)
    quantity: number;
}