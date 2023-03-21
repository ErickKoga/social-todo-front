import Nav from "@/components/Nav";
import styles from "./feed.module.css";

export default function FeedPage() {
  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.content}>
        <section className={styles.feed}></section>
        <section className={styles.todo}></section>
      </div>
    </div>
  );
}
