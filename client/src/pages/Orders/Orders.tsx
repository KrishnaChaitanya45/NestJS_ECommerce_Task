import React, { useContext, useEffect, useState } from "react";
import styles from "./Orders.module.scss";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../utils/Navbar/Navbar";

type OrderType = {
  order_id: number;
  user_id: number;
  totalPrice: number;
  products: {
    product_id: number;
    price: number;
    quantity: number;
  }[];
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/orders", {
        headers: {
          Authorization: `Bearer ${user && user.token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        console.log(data.orders);
        setOrders(data.orders);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      //! handle errors here
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <section className={styles.wrapper}>
      <Navbar />
      <header>
        <h1>Orders</h1>
      </header>
      {orders.length > 0 ? (
        orders.map((order: OrderType) => {
          return <Order {...order} />;
        })
      ) : (
        <p>No orders yet!</p>
      )}
    </section>
  );
};

const Order = (order: OrderType) => {
  return (
    <article className={styles.orderContainer}>
      <header>
        <h2>Order ID: #{order.order_id}</h2>
      </header>
      <div className={styles.orderDetails}>
        <p>Products: {order.products.length}</p>
        <p>Total Price: {Math.round(order.totalPrice)}</p>
        <p>Estimated Time : {Math.floor(Math.random() * 100) + " Days"}</p>
      </div>
    </article>
  );
};

export default Orders;
