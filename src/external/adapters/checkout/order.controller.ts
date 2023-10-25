import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from 'src/internal/domain/checkout/dto/create-order.dto';
import { ProductsService } from '../product/product.service';
import { responseError } from 'src/external/infra/errors/reponse.error';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderSwagger, CreatedOrderSwagger } from 'src/internal/application/docs/swagger/checkout/create-order.dto';

@ApiTags('Order')
@Controller('orders')
export class OrderController {

  constructor(
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
  ) {}

  @ApiOperation({ summary: 'Create Order' })
  @ApiBody({ type: CreateOrderSwagger })
  @ApiResponse({ status: 201, description: 'Order successfully created.', type: CreatedOrderSwagger  })
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      await this.productsService.verifyProductQuantity(createOrderDto.products);
      return this.ordersService.create(createOrderDto);
    } catch (err: any) {
      responseError(err);
    }
  }

  @ApiOperation({ summary: 'Prepare Order' })
  @ApiResponse({ status: 200 })
  @Post(':orderId/prepare')
  prepare(@Param('orderId') orderId: string) {
    try {
      return this.ordersService.prepare(orderId);
    } catch (err: any) {
      responseError(err);
    }
  }

  @ApiOperation({ summary: 'withdrawn' })
  @ApiResponse({ status: 200 })
  @Post(':orderId/withdrawn')
  withdrawn(@Param('orderId') orderId: string) {
    try {
      return this.ordersService.withdrawn(orderId);
    } catch (err: any) {
      responseError(err);
    }
  }

  @ApiOperation({ summary: 'Get Orders' })
  @ApiResponse({ status: 201, description: 'Order successfully created.' })
  @Get()
  getOrders(
    @Query('customerId') customerId?: string,
    @Query('status') status?: string,
  ) {
    try {
      return this.ordersService.findAll(customerId, status);
    } catch (err: any) {
      responseError(err);
    }
  }
}
