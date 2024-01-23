import { useContext, useEffect, useState } from "react";
import styles from "./User.module.scss";
import Navbar from "../../utils/Navbar/Navbar";
import { User } from "../../types";
import { AuthContext } from "../../context/AuthContext";
const Users = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        headers: {
          Authorization: `Bearer ${user && user.token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      //! handle errors here
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <section className={styles.container}>
      <Navbar />
      <header className={styles.header}>
        <h1>Users</h1>
      </header>
      <main>
        {users.length > 0 ? (
          users.map((user: User) => {
            return (
              <div className={styles.user} key={user.id}>
                <span># {user.id}</span>
                <b>{user.name}</b>
                <p>{user.email}</p>
              </div>
            );
          })
        ) : (
          <p>No users yet!</p>
        )}
      </main>
    </section>
  );
};

export default Users;
