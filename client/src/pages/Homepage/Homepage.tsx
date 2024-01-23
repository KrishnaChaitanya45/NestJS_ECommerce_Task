import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { RouterContext } from "../../routes/Routes";
import styles from "./Homepage.module.scss";
import Product from "./Product/Product";
import Link from "../../routes/Link";
import Navbar from "../../utils/Navbar/Navbar";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
};

const Homepage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const fetchProducts = async (category?: string) => {
    const response = await fetch(
      `http://localhost:3000/api/products${
        category ? `?category=${category}` : ""
      }`
    );
    const data = await response.json();
    setProducts(data.products);
    setFilteredProducts(data.products);
  };
  const { pushState } = useContext(RouterContext);
  useEffect(() => {
    fetchProducts();
  }, []);
  async function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == "Enter") {
      if (searchRef.current!.value.length > 0) {
        await fetchProducts(searchRef.current!.value);
      } else {
        setFilteredProducts(products);
      }
    }
  }
  async function AddToCart(id: number, count: number) {
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
  }
  return (
    <section className={styles.wrapper}>
      <Navbar handleSearch={handleSearch} searchRef={searchRef} />
      <main className={styles.productsContainer}>
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product
              key={product.id}
              {...product}
              AddToCartHandler={AddToCart}
            />
          ))
        ) : (
          <div>
            <h2>No Products Found</h2>
          </div>
        )}
      </main>
    </section>
  );
};

export default Homepage;
