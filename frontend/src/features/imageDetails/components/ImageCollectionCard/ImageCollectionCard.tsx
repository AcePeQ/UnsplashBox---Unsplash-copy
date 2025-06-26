import { Link } from "react-router-dom";
import styles from "./ImageCollectionCard.module.css";
import { Minus } from "lucide-react";

function ImageCollectionCard() {
  return (
    <Link to="/" className={styles.collection_card}>
      <div className={styles.card_header}>
        <img src="/test/test1.jpg" />
        <div className={styles.card_details}>
          <p className={styles.card_title}>Card Title</p>
          <p className={styles.card_numberOfPhotos}>23 Photos</p>
        </div>
      </div>
      <button className={styles.removeButton}>
        <Minus className={styles.icon} />
        Remove
      </button>
    </Link>
  );
}

export default ImageCollectionCard;
