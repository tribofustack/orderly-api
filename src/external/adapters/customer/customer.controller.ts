import { Controller, Post, Body } from '@nestjs/common';
import { CreateCustomerDto } from 'src/internal/domain/customers/dto/create-customer.dto';

import { CustomersService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }
}
