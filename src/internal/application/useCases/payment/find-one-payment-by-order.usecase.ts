import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPaymentRepository } from 'src/internal/domain/payment/repositories/payment.repository';
import { Payment } from 'src/internal/domain/payment/entities/payment.entity';

@Injectable()
export class FindOnePaymentByOrderId {
    constructor(
        @Inject('PaymentRepository')
        private paymentRepository: IPaymentRepository,
    ) { }

    async execute(orderId: string): Promise<Payment> {
        const payment = await this.paymentRepository.findOneByOrderId(orderId);
        if (!payment) throw new NotFoundException('Payment not found');
        return payment;
    }
}
