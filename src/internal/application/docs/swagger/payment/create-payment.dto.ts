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

  export class ReturnPaymentSwagger {
    @ApiProperty({ description: 'The ID of the payment.' })
    id: string;

    @ApiProperty({ description: 'The ID of the customer.' })
    customerId: string;

    @ApiProperty({ description: 'The ID of the order.' })
    orderId: string;

    @ApiProperty({ description: 'The value of order.' })
    value: number;

    @ApiProperty({ description: 'The status of order.' })
    status: string;

    @ApiProperty({ description: 'The type of payment.' })
    paymentType: string;

    @ApiProperty({ description: 'The qrcode for the payment.' })
    qrCode: string;

    @ApiProperty({ description: 'The payment url.' })
    url: string;
  }