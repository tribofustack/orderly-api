import { ApiProperty } from '@nestjs/swagger';

class ProductSwagger {
    @ApiProperty({ description: 'The ID of the product.' })
    id: string;
  
    @ApiProperty({ description: 'The quantity of the product.' })
    quantity: number;
  
    @ApiProperty({ description: 'The price of the product.' })
    price: number;
  }

export class CreatePaymentSwagger {
    @ApiProperty({ description: 'The ID of the customer.' })
    customerId: string;
  
    @ApiProperty({ type: [ProductSwagger], description: 'List of products.' })
    products: ProductSwagger[];
  }

  export class CancelPaymentSwagger {
    @ApiProperty({ description: 'The ID of the customer.' })
    customerId: string;
  
    @ApiProperty({ type: [ProductSwagger], description: 'List of products.' })
    products: ProductSwagger[];
  }