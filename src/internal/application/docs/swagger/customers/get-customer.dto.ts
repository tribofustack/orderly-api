import { ApiProperty } from '@nestjs/swagger';

export class GetCustomerSwagger {
    @ApiProperty({ description: 'The unique ID of the customer.' })
    id: string;

    @ApiProperty({ description: 'The CPF of the customer.' })
    cpf: string;

    @ApiProperty({ description: 'The name of the customer.' })
    name: string;

    @ApiProperty({ description: 'The email of the customer.' })
    email: string;
}