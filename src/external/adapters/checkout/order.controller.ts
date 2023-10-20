import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from 'src/internal/domain/checkout/dto/create-order.dto';
import { ProductsService } from '../product/product.service';
import { responseError } from 'src/external/infra/errors/reponse.error';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      await this.productsService.verifyProductQuantity(createOrderDto.products);
      return this.ordersService.create(createOrderDto);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Post(':orderId/prepare')
  prepare(@Param('orderId') orderId: string) {
    try {
      return this.ordersService.prepare(orderId);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Post(':orderId/withdrawn')
  withdrawn(@Param('orderId') orderId: string) {
    try {
      return this.ordersService.withdrawn(orderId);
    } catch (err: any) {
      responseError(err);
    }
  }

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
