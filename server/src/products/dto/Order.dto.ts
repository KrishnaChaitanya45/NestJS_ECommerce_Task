export class Order {
  user_id: number;
  products: Array<{
    product_id: number;
    quantity: number;
    price: number;
  }>;
  totalPrice: number;
}
