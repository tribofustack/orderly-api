export class CreateOrderDto {
    name: string
    customer_id: string
    status?: string
    items: any;
    amount: number;
}
