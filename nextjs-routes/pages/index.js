import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/main.module.css";

const Home = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/products");
  };
  return (
    <>
      <h1>Home Page</h1>
      <div className="home">
        <Link href="/blog">
          <a className={styles.highlight}>Blog</a>
        </Link>

        <div>
          <Link href="/products">
            <a className={styles.highlight}>Products</a>
          </Link>
          &ensp;
          <button onClick={handleClick} className="btn btn-primary">
            Place Order
          </button>
        </div>

        <Link href="/users">
          <a className={styles.highlight}>Users</a>
        </Link>

        <Link href="/posts">
          <a className={styles.highlight}>Posts</a>
        </Link>

        <Link href="/comments">
          <a className={styles.highlight}>Comments</a>
        </Link>
      </div>
    </>
  );
};
export default Home;
