import { Customer } from "../entities/item/customer.entity";


export interface CustomerGatewayInterface {
    create(customer: Customer): Promise<Customer>;
    findAll(): Promise<Customer[]>;
    findById(id: number): Promise<Customer>;
    update(id: number, customer: Customer): Promise<Customer>;
    delete(id: number): Promise<void>;
}