import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('order/:id/approve')
  approve(@Param('id') id: string) {
    return this.paymentService.approveByOrderId(id);
  }

  @Delete('order/:id/cancel')
  cancel(@Param('id') id: string) {
    return this.paymentService.cancelByOrderId(id);
  }

  @Get('order/:id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOneByOrderId(id);
  }
}
