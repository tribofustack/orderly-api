import { ApiProperty } from "@nestjs/swagger"

export class CreateCustomerDto {
    @ApiProperty()
    nome: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    cpf: string;
}