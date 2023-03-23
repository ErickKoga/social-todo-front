import Nav from "@/components/Nav";
import styles from "./users.module.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { getAllUsers } from "@/services/userService";
import { IUser } from "@/types/user.types";
import Router from "next/router";

export default function FeedPage() {
  const [userId, setUserId] = useState<string>("");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const payload: { id: string } = jwt_decode(token ?? "");
    setUserId(payload.id);

    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Failed to fetch users: ", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.content}>
        <div className={styles.userTable}>
          <table>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
            </tr>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}
