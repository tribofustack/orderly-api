import { Module } from '@nestjs/common';
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

import { CancelPaymentByOrderId } from '../../../internal/application/useCases/payment/cancel-payment.usecase';
import { ApprovePaymentByOrderId } from '../../../internal/application/useCases/payment/approve-payment.usecase';
import { FindOnePaymentByOrderId } from '../../../internal/application/useCases/payment/find-one-payment-by-order.usecase';
import { CreatePayment } from '../../../internal/application/useCases/payment/create-payment.usecase';

@Module({
  imports: [SequelizeModule.forFeature([PaymentModel]), QueueModule],
  controllers: [PaymentController],
  providers: [
    Uuid,
    PaymentSequelizeRepository,
    AxiosHttp,
    PaymentMercadoPago,
    PublishPaymentIntegrationListener,
    ChangePaymentStatusListener,
    PaymentConsumeOrder,
    CancelPaymentByOrderId,
    ApprovePaymentByOrderId,
    FindOnePaymentByOrderId,
    CreatePayment,
    { provide: 'IdGenerator', useExisting: Uuid },
    { provide: 'PaymentRepository', useExisting: PaymentSequelizeRepository },
    { provide: 'Http', useExisting: AxiosHttp },
    { provide: 'PaymentIntegration', useExisting: PaymentMercadoPago },
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
  ],
})
export class PaymentModule { }
