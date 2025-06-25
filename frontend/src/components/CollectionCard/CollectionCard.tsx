import { Link } from "react-router-dom";
import styles from "./CollectionCard.module.css";

function CollectionCard() {
  return (
    <article className={styles.card}>
      <Link className={styles.link} to="/">
        <figure className={styles.gallery}>
          <img src="/test/test1.jpg" alt="" className={styles.image} />
          <img src="/test/test2.jpg" alt="" className={styles.image} />
          <img src="/test/test3.jpg" alt="" className={styles.image} />
        </figure>
        <div className={styles.details}>
          <h5 className={styles.title}>Water</h5>
          <p className={styles.subTitle}>23 photos</p>
        </div>
      </Link>
    </article>
  );
}

export default CollectionCard;
