import { AttributeException } from 'src/internal/application/errors';

export interface ICustomer {
  id: string;
  name?: string;
  email?: string;
  cpf?: string;
}

export class Customer {
  id: string;
  name?: string;
  email?: string;
  cpf?: string;

  constructor(customer: ICustomer) {
    this.validate(customer);

    this.id = customer.id;
    this.cpf = customer.cpf;
    this.name = customer.name;
    this.email = customer.email;
  }

  private validate(customer: ICustomer) {
    if (!customer.id) throw new AttributeException('id not found.');
  }
}
