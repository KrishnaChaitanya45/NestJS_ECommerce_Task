import React, { useState, createContext } from "react";
import { Cart, ProductWithQuantity } from "../types";

export const CartContext = createContext({
  cart: [] as Cart | undefined,
  setCart: (cart: Cart) => {},
  addProductToCart: (product: ProductWithQuantity) => {},
  removeProductFromCart: (productId: number) => {},
  incrementProductQuantity: (productId: number) => {},
  decrementProductQuantity: (productId: number) => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart>();

  // Performing these operations form the server, so they are not needed here
  const addProductToCart = (product: ProductWithQuantity) => {
    if (!cart) {
      setCart([product]);
      return;
    }
    const existingProduct = cart.find((p) => p.id === product.id);
    if (existingProduct) {
      const updatedProducts = cart.map((p) => {
        if (p.id === product.id) {
          return { ...p, quantity: p.quantity + 1 };
        }
        return p;
      });
      setCart(updatedProducts);
      return;
    }
    setCart([...cart, product]);
  };
  const removeProductFromCart = (productId: number) => {
    if (!cart) {
      return;
    }
    const updatedProducts = cart.filter((p) => p.id !== productId);
    setCart(updatedProducts);
  };
  const incrementProductQuantity = (productId: number) => {
    if (!cart) {
      return;
    }
    const updatedProducts = cart.map((p) => {
      if (p.id === productId) {
        return { ...p, quantity: p.quantity + 1 };
      }
      return p;
    });
    setCart(updatedProducts);
  };
  const decrementProductQuantity = (productId: number) => {
    if (!cart) {
      return;
    }
    const updatedProducts = cart.map((p) => {
      if (p.id === productId) {
        return { ...p, quantity: p.quantity - 1 };
      }
      return p;
    });
    setCart(updatedProducts);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addProductToCart,
        removeProductFromCart,
        incrementProductQuantity,
        decrementProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
