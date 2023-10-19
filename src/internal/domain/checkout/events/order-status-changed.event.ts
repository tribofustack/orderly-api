import { orderStatusDto } from '../dto/order-status.dto';

type IConstructorDto = {
  orderId: string;
  status: orderStatusDto;
};

export class ChangedOrderStatusEvent {
  constructor(public data: IConstructorDto) {}
}
