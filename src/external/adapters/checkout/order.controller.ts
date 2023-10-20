import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from 'src/internal/domain/checkout/dto/create-order.dto';
import { ProductsService } from '../product/product.service';
import { responseError } from 'src/external/infra/errors/reponse.error';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('orders')
export class OrderController {

  constructor(
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
  ) {}

  constructor(private readonly ordersService: OrdersService) { }

  @ApiOperation({ summary: 'Create Order' })
  @ApiResponse({ status: 201, description: 'Order successfully created.' })
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
