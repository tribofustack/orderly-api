import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrderRepository } from 'src/internal/domain/checkout/repositories/order.repository';

@Injectable()
export class GetOrderStatus {
    constructor(
        @Inject('OrderRepository')
        private orderRepository: IOrderRepository,
    ) { }

    async execute(id: string): Promise<any> {
        const order = await this.orderRepository.findOne(id);
        if (!order) throw new NotFoundException('Order not found');

        const { status } = await this.orderRepository.getStatus(id);

        let timeToWait = 'Pedido ainda não foi iniciado.';

        if (status === 'Pago') timeToWait = 'Tempo de espera: 45 minutos.';

        if (status === 'Em preparação') timeToWait = 'Tempo de espera: 30 minutos.';

        if (status === 'Pronto') timeToWait = 'Pedido pronto para retirar.';

        if (status === 'Finalizado')
            timeToWait = 'Pedido foi retirado e finalizado.';

        return {
            status,
            timeToWait,
        };
    }
}