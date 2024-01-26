import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { responseError } from 'src/external/infra/errors/reponse.error';
import {  ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReturnPaymentSwagger } from 'src/internal/application/docs/swagger/payment/create-payment.dto';

import { CancelPaymentByOrderId } from '../../../internal/application/useCases/payment/cancel-payment.usecase';
import { ApprovePaymentByOrderId } from '../../../internal/application/useCases/payment/approve-payment.usecase';
import { FindOnePaymentByOrderId } from '../../../internal/application/useCases/payment/find-one-payment-by-order.usecase';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
  constructor(
    private readonly cancelPaymentByOrderId: CancelPaymentByOrderId,
    private readonly approvePaymentByOrderId: ApprovePaymentByOrderId,
    private readonly findOnePaymentByOrderId: FindOnePaymentByOrderId
  ) { }

  @ApiOperation({ summary: 'Create Order Payment' })
  @ApiResponse({
    status: 201,
    description: 'Payment successfully created.',
  })
  @Post('order/:id/approve')
  async approve(@Param('id') id: string) {
    try {
      return await this.approvePaymentByOrderId.execute(id);
    } catch (err) {
      return responseError(err);
    }
  }

  @ApiOperation({ summary: 'Cancel Order Payment' })
  @ApiResponse({
    status: 201,
    description: 'Payment successfully Cancelled.',
  })
  @Delete('order/:id/cancel')
  async cancel(@Param('id') id: string) {
    try {
      return await this.cancelPaymentByOrderId.execute(id);
    } catch (err) {
      return responseError(err);
    }
  }

  @ApiOperation({ summary: 'Get Order Payment by ID' })
  @ApiResponse({
    status: 200,
    description: 'Payment successfully Returned.',
    type: ReturnPaymentSwagger,
  })
  @Get('order/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.findOnePaymentByOrderId.execute(id);
    } catch (err) {
      return responseError(err);
    }
  }
}
