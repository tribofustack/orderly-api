import { ApiProperty } from "@nestjs/swagger"

export class CreateProductDto {
    @ApiProperty()
    order_item_id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    category: string;
    @ApiProperty()
    price: number;
    @ApiProperty()
    quantity: number;
}