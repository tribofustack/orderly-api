import { Controller, Post, Body } from '@nestjs/common';
import { CustomersService } from './customer.service';
import { CreateCustomerDto } from 'src/internal/domain/customers/dto/create-customer.dto';
import { responseError } from 'src/external/infra/errors/reponse.error';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      return this.customersService.create(createCustomerDto);
    } catch (err: any) {
      responseError(err);
    }
  }
}
