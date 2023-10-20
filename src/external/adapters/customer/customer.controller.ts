import { Controller, Post, Body } from '@nestjs/common';
import { CustomersService } from './customer.service';
import { CreateCustomerDto } from 'src/internal/domain/customers/dto/create-customer.dto';
import { responseError } from 'src/external/infra/errors/reponse.error';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customersService: CustomersService) { }

  @ApiOperation({ summary: 'Create Customer' })
  @ApiResponse({ status: 201, description: 'Customer successfully created.' })
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      return this.customersService.create(createCustomerDto);
    } catch (err: any) {
      responseError(err);
    }
  }
}
