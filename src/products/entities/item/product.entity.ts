export class Product {
    id?: number;
    order_item_id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    quantity: number;

    constructor(order_item_id: string, name: string, description: string, category: string, price: number, quantity: number, id?: number) {
        this.order_item_id = order_item_id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
        this.id = id;
    }
}
