import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Customer } from 'src/internal/domain/customers/entities/customer.entity';
import { ICustomerRepository } from 'src/internal/domain/customers/repositories/customer.repository';

@Injectable()
export class FindCustomerByCpf {
    constructor(
        @Inject('CustomerRepository')
        private customerRepository: ICustomerRepository,
    ) { }

    async execute(cpf: string): Promise<Customer> {
        const customer = await this.customerRepository.findByCpf(cpf);

        if (!customer) throw new NotFoundException('Customer not found');

        return customer;
    }
}