import { ApiProperty } from '@nestjs/swagger';

class ProductSwagger {
  @ApiProperty({ description: 'The ID of the product.' })
  id: string;

  @ApiProperty({ description: 'The quantity of the product.' })
  quantity: number;

  @ApiProperty({ description: 'The price of the product.' })
  price: number;
}

class OrderItemSwagger {
  @ApiProperty({ description: 'The ID of the order item.' })
  id: string;

  @ApiProperty({ description: 'The ID of the product.' })
  productId: string;

  @ApiProperty({ description: 'The value of the product.' })
  value: number;

  @ApiProperty({ description: 'The quantity of the product.' })
  quantity: number;

  @ApiProperty({
    description: 'The total cost of the product (value * quantity).',
  })
  total: number;
}

export class CreateOrderSwagger {
  @ApiProperty({ description: 'The ID of the customer.' })
  customerId: string;

  @ApiProperty({ type: [ProductSwagger], description: 'List of products.' })
  products: ProductSwagger[];
}

export class CreatedOrderSwagger {
  @ApiProperty({ description: 'The ID of the order.' })
  id: string;

  @ApiProperty({ description: 'The ID of the customer.' })
  customerId: string;

  @ApiProperty({
    type: [OrderItemSwagger],
    description: 'List of order items.',
  })
  orderItems: OrderItemSwagger[];

  @ApiProperty({ description: 'The status of the order.' })
  status: string;

  @ApiProperty({ description: 'The total cost of the order.' })
  total: number;
}
