import AddCollectionButton from "../../../../components/AddToCollectionButton/AddCollectionButton";
import CollectionCard from "../../../../components/CollectionCard/CollectionCard";

import styles from "./Collections.module.css";

function Collections() {
  return (
    <div className={styles.collections}>
      <CollectionCard />
      <CollectionCard />
      <AddCollectionButton />
    </div>
  );
}

export default Collections;
