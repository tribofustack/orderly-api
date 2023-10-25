import { ApiProperty } from '@nestjs/swagger';

export class CreateProductSwagger {
    @ApiProperty({ description: 'The name of the product.' })
    name: string;

    @ApiProperty({ description: 'The description of the product.' })
    description: string;

    @ApiProperty({ description: 'The category of the product.' })
    category: string;

    @ApiProperty({ description: 'The price of the product.' })
    price: number;

    @ApiProperty({ description: 'The quantity of the product available.' })
    quantity: number;
}

export class CreatedProductSwagger {
    @ApiProperty({ description: 'The unique identifier of the product.' })
    id: string;

    @ApiProperty({ description: 'The name of the product.' })
    name: string;

    @ApiProperty({ description: 'The description of the product.' })
    description: string;

    @ApiProperty({ description: 'The category of the product.' })
    category: string;

    @ApiProperty({ description: 'The price of the product.' })
    price: number;

    @ApiProperty({ description: 'The quantity of the product available.' })
    quantity: number;
}