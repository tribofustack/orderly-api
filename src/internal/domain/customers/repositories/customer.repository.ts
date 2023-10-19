import { IRepository } from 'src/internal/application/ports/repositories/repository';

import { Customer } from '../entities/customer.entity';

export interface ICustomerRepository extends IRepository<Customer> {
  findByCpf(cpf: string): Promise<Customer | null>;
  findOneByCpfOrEmail(cpf?: string, email?: string): Promise<Customer | null>;
}
