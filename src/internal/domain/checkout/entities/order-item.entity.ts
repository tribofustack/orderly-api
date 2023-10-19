import {
  AttributeException,
  DomainException,
} from 'src/internal/application/errors';

export interface IOrderItem {
  id: string;
  productId: string;
  value: number;
  total: number;
  quantity: number;
}
type IConstructorDto = Omit<IOrderItem, 'total'>;

export class OrderItem implements IOrderItem {
  id: string;
  productId: string;
  value: number;
  quantity: number;
  total: number;

  constructor(orderItem: IConstructorDto) {
    this.validate(orderItem);

    this.id = orderItem.id;
    this.productId = orderItem.productId;
    this.value = orderItem.value;
    this.quantity = orderItem.quantity;
    this.total = this.sumTotal();
  }

  private validate(orderItem: IConstructorDto) {
    if (!orderItem.id) throw new AttributeException('id not found.');

    if (!orderItem.productId)
      throw new DomainException('productId is required.');

    if (!orderItem.value || orderItem.value < 0)
      throw new AttributeException('value not found.');

    if (!orderItem.quantity || orderItem.quantity < 0)
      throw new AttributeException('quantity not found.');
  }

  private sumTotal() {
    return this.value * this.quantity;
  }
}
