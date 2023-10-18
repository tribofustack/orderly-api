import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/item/create-customer.dto';
import { UpdateCustomerDto } from './dto/item/update-customer.dto';
import { CustomerGatewayInterface } from './gateways/customer-gateway-interface';
import { Customer } from './entities/item/customer.entity';

@Injectable()
export class CustomerService {

  constructor(
    @Inject('CustomerPersistenceGateway')
    private customerPersistenceGateway: CustomerGatewayInterface,

  ) { }

  async create(createOrderDto: CreateCustomerDto) {
    const customer = new Customer(createOrderDto.nome, createOrderDto.email, createOrderDto.cpf);

    let createdUser = null

    if (createOrderDto.nome || createOrderDto.email || createOrderDto.cpf) {
      createdUser = await this.customerPersistenceGateway.create(customer);
    }

    return createdUser;
  }

  findAll() {
    return this.customerPersistenceGateway.findAll();
  }

  findOne(id: number) {
    return this.customerPersistenceGateway.findById(id);
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = new Customer(
      updateCustomerDto.nome,
      updateCustomerDto.email,
      updateCustomerDto.cpf
    );

    await this.customerPersistenceGateway.update(id, customer);

    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.customerPersistenceGateway.delete(id);
  }
}
