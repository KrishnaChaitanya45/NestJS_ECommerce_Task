import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { Add_To_Cart, CartProducts } from './dto/Cart.dto';
@Injectable()
export class ProductService {
  async getProducts(query: { [category: string]: string }) {
    try {
      const productsFetched = await fs.readFile(
        'src/db/products.json',
        'utf-8',
      );
      const { products } = JSON.parse(productsFetched);
      const { category } = query;
      if (category) {
        const filteredProducts = products.filter(
          (p: any) => p.category === category,
        );
        if (filteredProducts.length === 0) throw new Error('No products found');
        return {
          success: true,
          products: filteredProducts,
        };
      }
      return {
        success: true,
        products: products,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async AddProductToCart(cartInput: Add_To_Cart, id: number) {
    const { product_id, quantity } = cartInput;
    try {
      //fetch users from db
      const usersFetched = await fs.readFile('src/db/users.json', 'utf-8');
      const { users } = JSON.parse(usersFetched);
      //find user by id
      const user = users.find((u: any) => u.id === id);
      if (!user) throw new Error('User not found');

      //fetch products from db
      const productsFetched = await fs.readFile(
        'src/db/products.json',
        'utf-8',
      );
      const { products } = JSON.parse(productsFetched);
      //find product by id
      const product = products.find((p: any) => p.id === product_id);
      if (!product) throw new Error('Product not found');
      const userIndex = users.findIndex((u: any) => u.id === id);

      //check if product already exists in cart
      const productIndex = user.cart.findIndex((p: any) => p.id === product_id);
      if (productIndex > -1) {
        user.cart[productIndex].quantity += quantity;
        const updatedUsers = [
          ...users.slice(0, userIndex),
          user,
          ...users.slice(userIndex + 1),
        ];
        await fs.writeFile(
          'src/db/users.json',
          JSON.stringify({ users: updatedUsers }),
        );
        return {
          success: true,
          message: 'Product added to cart',
        };
      }
      const updatedUser = {
        ...user,
        cart: [...user.cart, { ...product, quantity }],
      };
      const updatedUsers = [
        ...users.slice(0, userIndex),
        updatedUser,
        ...users.slice(userIndex + 1),
      ];
      await fs.writeFile(
        'src/db/users.json',
        JSON.stringify({ users: updatedUsers }),
      );
      return {
        success: true,
        message: 'Product added to cart',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async Order(id: number) {
    try {
      //fetch users from db
      const usersFetched = await fs.readFile('src/db/users.json', 'utf-8');
      const { users } = JSON.parse(usersFetched);
      //find user by id
      const user = users.find((u: any) => u.id === id);
      if (!user) throw new Error('User not found');

      const products = user.cart;
      if (!products) throw new Error('No products in cart');
      const totalPrice = products.reduce(
        (total: number, p: CartProducts) => total + p.price * p.quantity,
        0,
      );
      const order = {
        order_id: Math.floor(Math.random() * 1000),
        user_id: id,
        products: products.map((p: CartProducts) => ({
          product_id: p.id,
          quantity: p.quantity,
          price: p.price,
        })),
        totalPrice,
      };
      const ordersFetched = await fs.readFile('src/db/orders.json', 'utf-8');
      const { orders } = JSON.parse(ordersFetched);
      const updatedOrders = [...orders, order];
      await fs.writeFile(
        'src/db/orders.json',
        JSON.stringify({ orders: updatedOrders }),
      );
      return {
        success: true,
        message: 'Order placed successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
