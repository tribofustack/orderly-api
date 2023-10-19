import { Customer } from 'src/internal/domain/customers/entities/customer.entity';

export class CustomerCreatedEvent {
  constructor(public customer: Customer) {}
}
