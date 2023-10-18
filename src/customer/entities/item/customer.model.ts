import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript'

export type CustomerAttributes = {
    id?: number;
    nome: string;
    email: string;
    cpf: string;
}

@Table({ tableName: 'customer' })
export class CustomerModel extends Model<CustomerAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    nome: string | null;

    @Column(DataType.STRING)
    email: string | null;

    @Column(DataType.STRING)
    cpf: string | null;

}