import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseError } from 'src/external/infra/errors/reponse.error';
import {
  CreatedCustomerSwagger,
  CreateCustomerSwagger,
} from 'src/internal/application/docs/swagger/customers/create-customer.dto';
import { GetCustomerSwagger } from 'src/internal/application/docs/swagger/customers/get-customer.dto';
import { CreateCustomerDto } from 'src/internal/domain/customers/dto/create-customer.dto';
import { CreateCustomer } from '../../../internal/application/useCases/customer/create-customer.usecase';
import { FindCustomerByCpf } from '../../../internal/application/useCases/customer/find-by-cpf.usecase';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(
    private readonly createCustomer: CreateCustomer,
    private readonly findCustomerByCpf: FindCustomerByCpf,
  ) {
  }

  @ApiOperation({ summary: 'Create Customer' })
  @ApiBody({ type: CreateCustomerSwagger })
  @ApiResponse({
    status: 201,
    description: 'Customer successfully created.',
    type: CreatedCustomerSwagger,
  })
  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      return await this.createCustomer.execute(createCustomerDto);
    } catch (err) {
      return responseError(err);
    }
  }

  @ApiOperation({ summary: 'Get Customer by CPF' })
  @ApiResponse({
    status: 200,
    description: 'Customer found.',
    type: GetCustomerSwagger,
  })
  @Get(':cpf')
  async getCustomer(@Param('cpf') cpf: string) {
    try {
      return await this.findCustomerByCpf.execute(cpf);
    } catch (err) {
      return responseError(err);
    }
  }
}
