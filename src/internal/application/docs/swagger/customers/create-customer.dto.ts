import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerSwagger {
    @ApiProperty({ description: 'The name of the customer.', required: false })
    name?: string;

    @ApiProperty({ description: 'The email of the customer.', required: false })
    email?: string;

    @ApiProperty({ description: 'The CPF (Cadastro de Pessoa Física) of the customer.', required: false })
    cpf?: string;
}

export class CreatedCustomerSwagger {
    @ApiProperty({ description: 'The unique ID of the customer.' })
    id: string;

    @ApiProperty({ description: 'The CPF of the customer.' })
    cpf: string;

    @ApiProperty({ description: 'The name of the customer.' })
    name: string;

    @ApiProperty({ description: 'The email of the customer.' })
    email: string;
}