import { InjectModel } from "@nestjs/sequelize";
import { Customer } from "../entities/item/customer.entity";
import { CustomerGatewayInterface } from "./customer-gateway-interface";
import { CustomerModel } from "../entities/item/customer.model";
import { Op } from 'sequelize';
import { NotFoundException } from '@nestjs/common';

export class CustomerGatewaySequelize implements CustomerGatewayInterface {

    constructor(
        @InjectModel(CustomerModel)
        private customerModel: typeof CustomerModel
    ) { }

    async create(customer: Customer): Promise<Customer> {

        const exists = await this.customerModel.findOne({
            where: {
                [Op.or]: [
                    { email: customer.email },
                    { cpf: customer.cpf },
                ]
            }
        })

        let newUser = null;

        if (!exists) {
            const createdUser = await this.customerModel.create(customer)
            newUser = {
                id: createdUser.dataValues.id,
                nome: createdUser.dataValues.nome,
                email: createdUser.dataValues.email,
                cpf: createdUser.dataValues.cpf
            }

        } else {
            await this.customerModel.update(customer, { where: { id: exists.id } })
            newUser = {
                id: exists.dataValues.id,
                nome: exists.dataValues.nome,
                email: exists.dataValues.email,
                cpf: exists.dataValues.cpf
            }
        }

        return newUser
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await this.customerModel.findAll();
        return customerModels.map(
            (customerModel) => new Customer(customerModel.nome, customerModel.email, customerModel.cpf, customerModel.id),
        );
    }

    async findById(id: number): Promise<Customer> {
        const customerModel = await this.customerModel.findByPk(id)

        if (customerModel) {
            return new Customer(customerModel.nome, customerModel.email, customerModel.cpf, customerModel.id)
        } else {
            throw new NotFoundException('Usuário não encontrado');
        }

    }

    async update(id: number, customer: Customer): Promise<Customer> {
        await this.customerModel.update(customer, {
            where: {
                id: id
            }
        });
        return customer
    }

    async delete(id: number): Promise<void> {
        await this.customerModel.destroy({
            where: {
                id: id
            }
        });
    }
}