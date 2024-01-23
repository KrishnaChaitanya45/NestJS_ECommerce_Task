import React, { useContext, useState } from "react";
import styles from "./Product.module.scss";
import { AuthContext } from "../../../context/AuthContext";

type Props = {
  id: number;
  name: string;
  description: string;
  price: number;
  isCart?: boolean;
  quantity?: number;
  category: string;
  AddToCartHandler?: (id: number, count: number) => void;
  RemoveProductHandler?: (id: number) => void;
};

const Product = ({
  id,
  name,
  description,
  isCart,
  price,
  category,
  quantity,
  AddToCartHandler,
  RemoveProductHandler,
}: Props) => {
  const [count, setCount] = useState(quantity || 1);
  const { user } = useContext(AuthContext);
  const productExistsInCart =
    user && user.cart.find((product) => product.id === id);
  return (
    <article className={styles.product}>
      <figure className={styles.productImage}>
        <img src={`https://picsum.photos/id/${id}/200/300`} alt="product" />
      </figure>
      <div className={styles.productDetails}>
        <h3>{name}</h3>
        <p>{description}</p>
        <div>
          <b className={styles.price}>{price}</b>
          <span className={styles.category}>{category}</span>
        </div>
        <div className={styles.cartInput}>
          <button
            onClick={() => {
              setCount((prev) => prev + 1);
            }}
          >
            {" "}
            +{" "}
          </button>
          <p>{count}</p>
          <button
            onClick={() => {
              if (count > 1) setCount((prev) => prev - 1);
            }}
          >
            {" "}
            -{" "}
          </button>
        </div>

        <button
          className={
            productExistsInCart ? styles.addedToCart : styles.addToCart
          }
          disabled={Boolean(productExistsInCart)}
          onClick={() => {
            AddToCartHandler && AddToCartHandler(id, count);
          }}
        >
          {" "}
          {productExistsInCart && !isCart
            ? "Added To Cart"
            : isCart
            ? "Update 🛒"
            : "Add To Cart 🛒"}{" "}
        </button>
        {isCart && (
          <button
            className={styles.removeFromCart}
            onClick={() => {
              RemoveProductHandler && RemoveProductHandler(id);
            }}
          >
            Remove From Cart 🛒
          </button>
        )}
      </div>
    </article>
  );
};

export default Product;
