import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import { AuthContext } from "../../context/AuthContext";
import { RouterContext } from "../../routes/Routes";
import Product from "../Homepage/Product/Product";
import { ProductWithQuantity } from "../../types";
import Navbar from "../../utils/Navbar/Navbar";
const Cart = () => {
  const { user, setUser } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const { pushState } = useContext(RouterContext);
  const fetchCart = async () => {
    try {
      const cart = await fetch("http://localhost:3000/api/products/cart", {
        headers: {
          Authorization: `Bearer ${user && user.token}`,
        },
      });
      const data = await cart.json();
      if (data.success) {
        setCart(data.cart);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      //! Error handling here..!
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  async function removeFromCartHandler(id: number) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/products/remove-from-cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user && user.token}`,
          },
          body: JSON.stringify({ product_id: id }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setCart(data.cart);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      //! Handling error here
      console.log(error);
    }
  }
  async function UpdateCartHandler(id: number, count: number) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/products/update-cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user && user.token}`,
          },
          body: JSON.stringify({ product_id: id, quantity: count }),
        }
      );
      const data = await response.json();
      if (data.success) {
        const userCopy = JSON.parse(JSON.stringify(user));
        userCopy.cart = data.cart;
        setUser(userCopy);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      //! Handling error here
      console.log(error);
    }
  }

  async function checkOutHandler() {
    try {
      const response = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user && user.token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setCart([]);
        user && setUser({ ...user, cart: [] });
        setTimeout(() => {
          pushState("/orders");
        }, 3000);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      //! Handling error here
      console.log(error);
    }
  }

  const TOTAL_COST = user?.cart.reduce(
    (total: number, p) => total + p.price * p.quantity,
    0
  );
  return (
    <section className={styles.cart}>
      <Navbar />
      <header className={styles.header}>
        <h1 className={styles.heading}>Cart</h1>
        <div className={styles.costDiv}>
          <h2>Total Cost :-</h2>
          <p> {TOTAL_COST && Math.round(TOTAL_COST)} $</p>
        </div>
        <button onClick={checkOutHandler}>Checkout 🚚</button>
      </header>
      <main className={styles.container}>
        {cart && cart.length > 0 ? (
          cart.map((item: ProductWithQuantity) => {
            return (
              <Product
                key={item.id}
                {...item}
                isCart={true}
                AddToCartHandler={UpdateCartHandler}
                RemoveProductHandler={removeFromCartHandler}
              />
            );
          })
        ) : (
          <h2>Cart is Empty</h2>
        )}
      </main>
    </section>
  );
};

export default Cart;
