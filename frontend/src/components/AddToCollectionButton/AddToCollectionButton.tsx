import { Plus } from "lucide-react";
import styles from "./AddToCollectionButton.module.css";

function AddToCollectionButton() {
  return (
    <button className={`${styles.btn} ${styles.big}`}>
      <Plus aria-disabled className={styles.icon} />
      Add new collection
    </button>
  );
}

export default AddToCollectionButton;
