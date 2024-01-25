import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from 'src/internal/domain/checkout/repositories/order.repository';

@Injectable()
export class GetCustomerReport {
    constructor(
        @Inject('OrderRepository')
        private orderRepository: IOrderRepository,
    ) { }

    async execute(customerId: string): Promise<any> {
        return await this.orderRepository.getReportByCustomer(customerId);
    }
}