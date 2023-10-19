import { Column, DataType, Model, Table } from 'sequelize-typescript';

import { ICustomer } from '../../../../internal/domain/customers/entities/customer.entity';

export interface ICustomerModel extends ICustomer {}

@Table({
  tableName: 'customers',
  timestamps: false,
})
export class CustomerModel extends Model implements ICustomerModel {
  @Column({
    field: 'id',
    primaryKey: true,
    unique: true,
    allowNull: false,
    type: DataType.STRING,
  })
  declare id: string;

  @Column({
    field: 'name',
    allowNull: true,
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    field: 'email',
    allowNull: true,
    unique: true,
    type: DataType.STRING,
  })
  declare email: string;

  @Column({
    field: 'cpf',
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  declare cpf: string;
}
