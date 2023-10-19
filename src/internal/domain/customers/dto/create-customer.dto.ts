import { ICustomer } from 'src/internal/domain/customers/entities/customer.entity';

export interface CreateCustomerDto extends Partial<ICustomer> {}
