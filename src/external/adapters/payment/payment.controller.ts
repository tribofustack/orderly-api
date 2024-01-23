import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { responseError } from 'src/external/infra/errors/reponse.error';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CancelPaymentSwagger, CreatePaymentSwagger, ReturnPaymentSwagger } from 'src/internal/application/docs/swagger/payment/create-payment.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Create Order Payment' })
  @ApiBody({ type: CreatePaymentSwagger })
  @ApiResponse({
    status: 201,
    description: 'Payment successfully created.',
    // type: CreatedOrderSwagger,
  })
  @Post('order/:id/approve')
  async approve(@Param('id') id: string) {
    try {
      return await this.paymentService.approveByOrderId(id);
    } catch (err) {
      return responseError(err);
    }
  }

  @ApiOperation({ summary: 'Cancel Order Payment' })
  @ApiBody({ type: CancelPaymentSwagger })
  @ApiResponse({
    status: 201,
    description: 'Payment successfully Cancelled.',
    // type: CreatedOrderSwagger,
  })
  @Delete('order/:id/cancel')
  async cancel(@Param('id') id: string) {
    try { 
      return await this.paymentService.cancelByOrderId(id);
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
      return await this.paymentService.findOneByOrderId(id);
    } catch (err) {
      return responseError(err);
    }
  }
}
