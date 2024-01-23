import { Product } from ".";

export interface ProductWithQuantity extends Product {
  quantity: number;
}

export type Cart = ProductWithQuantity[];
