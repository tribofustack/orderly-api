import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Uuid } from 'src/external/infra/tokens/uuid/uuid';
import { PaymentSequelizeRepository } from './sequelize/payment-sequelize.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PublishPaymentIntegrationListener } from './bullmq/listeners/publish-order-request.listener';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentModel } from './sequelize/payment-model';
import { PaymentConsumeOrder } from './bullmq/consumers/order.consumer';
import { AxiosHttp } from 'src/external/infra/http/axios';
import QueueModule from 'src/external/infra/queue';
import { ChangePaymentStatusListener } from './bullmq/listeners/change-payment-status.listener';
import { PaymentMercadoPago } from 'src/external/infra/payment/payment-mercadopago';

@Module({
  imports: [SequelizeModule.forFeature([PaymentModel]), QueueModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    Uuid,
    { provide: 'IdGenerator', useExisting: Uuid },
    PaymentSequelizeRepository,
    { provide: 'PaymentRepository', useExisting: PaymentSequelizeRepository },
    AxiosHttp,
    { provide: 'Http', useExisting: AxiosHttp },
    PaymentMercadoPago,
    { provide: 'PaymentIntegration', useExisting: PaymentMercadoPago },
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
    PublishPaymentIntegrationListener,
    ChangePaymentStatusListener,
    PaymentConsumeOrder,
  ],
})
export class PaymentModule {}
