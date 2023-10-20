import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { CreateOrderDto } from 'src/internal/domain/checkout/dto/create-order.dto';

import { OrdersService } from './order.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('orders')
export class OrderController {
  constructor(private readonly ordersService: OrdersService) { }

  @ApiOperation({ summary: 'Create Order' })
  @ApiResponse({ status: 201, description: 'Order successfully created.' })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Prepare Order' })
  @ApiResponse({ status: 200 })
  @Post(':orderId/prepare')
  prepare(@Param('orderId') orderId: string) {
    return this.ordersService.prepare(orderId);
  }

  @ApiOperation({ summary: 'withdrawn' })
  @ApiResponse({ status: 200 })
  @Post(':orderId/withdrawn')
  withdrawn(@Param('orderId') orderId: string) {
    return this.ordersService.withdrawn(orderId);
  }

  @ApiOperation({ summary: 'Get Orders' })
  @ApiResponse({ status: 201, description: 'Order successfully created.' })
  @Get()
  getOrders(
    @Query('customerId') customerId?: string,
    @Query('status') status?: string,
  ) {
    return this.ordersService.findAll(customerId, status);
  }
}
