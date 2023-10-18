import { Inject, Injectable } from "@nestjs/common";
import { ProductGatewayInterface } from "../gateways/product-gateway-interface";
import { OnEvent } from "@nestjs/event-emitter";
import { OrderCreatedEvent } from "src/checkout/events/order-created.event";

@Injectable()
export class DecreaseProductListener {
    constructor(
        @Inject('ProductPersistenceGateway')
        private productIntegrationGateway: ProductGatewayInterface
    ) { }


    @OnEvent('order.created')
    async handle(event: OrderCreatedEvent) {

        for (const item of event.order.items) {
            const product = await this.productIntegrationGateway.findById(item.id)

            if (product) {
                product.quantity = product.quantity - parseInt(item.quantidade);

                this.productIntegrationGateway.update(item.id, product)
            }

        }
    }
}