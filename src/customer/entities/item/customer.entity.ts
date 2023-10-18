export class Customer {
    id?: number;
    nome: string;
    email: string;
    cpf: string;

    constructor(nome?: string, email?: string, cpf?: string, id?: number) {
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.id = id;
    }
}
