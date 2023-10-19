import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Customer } from 'src/internal/domain/customers/entities/customer.entity';
import { ICustomerRepository } from 'src/internal/domain/customers/repositories/customer.repository';

import { CustomerModel } from './customer.model';

@Injectable()
export class CustomerSequelizeRepository implements ICustomerRepository {
  constructor(
    @InjectModel(CustomerModel)
    private model: typeof CustomerModel,
  ) {}

  async findOne(id: string): Promise<Customer | null> {
    const customerModel = await this.model.findOne({ where: { id } });
    if (!customerModel) return null;

    return new Customer({
      id: customerModel.id,
      cpf: customerModel.cpf,
      email: customerModel.email,
      name: customerModel.name,
    });
  }

  async findOneByCpfOrEmail(
    cpf = null,
    email = null,
  ): Promise<Customer | null> {
    const customerModel = await this.model.findOne({
      where: { [Op.or]: [{ cpf }, { email }] },
    });
    if (!customerModel) return null;

    return new Customer({
      id: customerModel.id,
      cpf: customerModel.cpf,
      email: customerModel.email,
      name: customerModel.name,
    });
  }

  async findByCpf(cpf: string): Promise<Customer | null> {
    const customerModel = await this.model.findOne({ where: { cpf } });
    if (!customerModel) return null;
    return new Customer({
      id: customerModel.id,
      cpf: customerModel.cpf,
      email: customerModel.email,
      name: customerModel.name,
    });
  }

  async findAll(): Promise<Customer[]> {
    const customersModel = await this.model.findAll();
    if (customersModel.length < 1) throw Error('not found customers in db');
    return customersModel.map(
      c =>
        new Customer({
          cpf: c.cpf,
          email: c.email,
          id: c.id,
          name: c.name,
        }),
    );
  }

  async create(params: Partial<Customer>): Promise<Customer> {
    const customerModel = await this.model.create(params);
    return new Customer({
      cpf: customerModel.cpf,
      email: customerModel.email,
      id: customerModel.id,
      name: customerModel.name,
    });
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }

  async update(
    id: string,
    customerToUpdate: Omit<Customer, 'id'>,
  ): Promise<void> {
    await this.model.update(customerToUpdate, { where: { id } });
  }
}
