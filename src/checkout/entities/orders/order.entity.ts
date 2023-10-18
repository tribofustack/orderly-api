export class Order {
    id?: number;
    name: string;
    customer_id: string;
    status?: string;
    items: any;
    amount: number;


    constructor(name: string, customer_id?: string, status?: string, items?: any, amount?: number, id?: number) {
        this.name = name;
        this.customer_id = customer_id;
        this.status = status;
        this.items = items;
        this.amount = amount;
        this.id = id;
    }
}
