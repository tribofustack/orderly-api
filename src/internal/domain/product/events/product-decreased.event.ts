type productDto = {
  id: string;
  quantity: number;
  value: number;
};
export class ProductDecreasedEvent {
  constructor(public product: productDto[]) {}
}
