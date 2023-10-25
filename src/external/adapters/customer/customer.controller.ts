import { Controller, Post, Body } from '@nestjs/common';
import { CustomersService } from './customer.service';
import { CreateCustomerDto } from 'src/internal/domain/customers/dto/create-customer.dto';
import { responseError } from 'src/external/infra/errors/reponse.error';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatedCustomerSwagger, CreateCustomerSwagger } from 'src/internal/application/docs/swagger/customers/create-customer.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customersService: CustomersService) { }

  @ApiOperation({ summary: 'Create Customer' })
  @ApiBody({ type: CreateCustomerSwagger })
  @ApiResponse({ status: 201, description: 'Customer successfully created.', type: CreatedCustomerSwagger })
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      return this.customersService.create(createCustomerDto);
    } catch (err: any) {
      responseError(err);
    }
  }
}
