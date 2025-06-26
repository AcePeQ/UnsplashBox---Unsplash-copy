import ImageCollectionCard from "../ImageCollectionCard/ImageCollectionCard";
import styles from "./ImageCollections.module.css";

function ImageCollections() {
  return (
    <div className={styles.collections}>
      <p className={styles.title}>Collections</p>

      <div className={styles.collection_cards}>
        <ImageCollectionCard />
        <ImageCollectionCard />
        <ImageCollectionCard />
        <ImageCollectionCard />
        <ImageCollectionCard />
        <ImageCollectionCard />
        <ImageCollectionCard />
        <ImageCollectionCard />
        <ImageCollectionCard />
        <ImageCollectionCard />
      </div>
    </div>
  );
}

export default ImageCollections;
