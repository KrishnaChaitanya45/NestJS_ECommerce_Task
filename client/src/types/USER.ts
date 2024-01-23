import { ProductWithQuantity } from ".";
import { Product } from "./Product";

export type User = {
  id: number;
  name: string;
  email: string;
  token: string;
  password: string;
  cart: ProductWithQuantity[];
};
