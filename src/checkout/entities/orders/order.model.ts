import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript'

export type OrderAttributes = {
    id?: number;
    name: string;
    customer_id: string;
    status: string;
    items: any;
    amount: number;
}

@Table({ tableName: 'orders' })
export class OrderModel extends Model<OrderAttributes>{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column
    name: string;

    @Column
    customer_id: string;

    @Column
    status: string;

    @Column(DataType.JSONB)
    items: any;

    @Column(DataType.DOUBLE)
    amount: number;
}

