import React, { useContext } from "react";
import styles from "./Navbar.module.scss";
import Link from "../../routes/Link";
import { AuthContext } from "../../context/AuthContext";
import { RouterContext } from "../../routes/Routes";

type NavProps = {
  searchRef?: React.RefObject<HTMLInputElement>;
  handleSearch?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Navbar = ({ searchRef, handleSearch }: NavProps) => {
  const { user } = useContext(AuthContext);
  const { pushState } = useContext(RouterContext);
  return (
    <nav className={styles.nav}>
      <figure className={styles.logo}>
        <Link to="/">🛍️</Link>
      </figure>
      <div className={styles.search}>
        {searchRef && handleSearch && (
          <input
            type="text"
            ref={searchRef}
            placeholder="Search Category"
            onKeyUp={handleSearch}
          />
        )}
      </div>
      <div>
        <button
          className={styles.cart}
          onClick={() => {
            pushState("/cart");
          }}
        >
          <span>🛒</span>
          <p>{user?.cart.length}</p>
        </button>
        <button className={styles.logout}>
          <a href="/signin">Logout</a>
        </button>
        <button className={styles.orders}>
          <Link to="/orders">Orders 🚚</Link>
        </button>
        <button className={styles.logout}>
          <Link to="/users">Users 👤</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
