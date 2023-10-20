export interface CreateOrderDto {
  customerId: string;
  products: Array<{
    id: string;
    quantity: number;
    price: number;
  }>;
}
