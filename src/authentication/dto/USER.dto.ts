import { Product } from 'src/products/dto/Product.dto';

export class Register_User {
  name: string;
  email: string;
  password: string;
}

export class Login_User {
  email: string;
  password: string;
}

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  cart: Product[];
}
