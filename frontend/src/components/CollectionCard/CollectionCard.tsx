import { Link } from "react-router-dom";
import styles from "./CollectionCard.module.css";
import type { ICollection } from "../../types/collectionTypes";

function CollectionCard({ collection }: { collection: ICollection }) {
  console.log(collection);
  const collectionLength = collection.collection.length;

  const collectionImages = collection.collection.slice(0, 3);

  return (
    <article className={styles.card}>
      <Link
        className={styles.link}
        to={`/collection/${collection.collection_name}`}
      >
        <figure className={styles.gallery}>
          {collectionLength === 0 && (
            <div className={styles.notify}>Add photos to the collection</div>
          )}
          {collectionImages.map((image) => (
            <img
              src={image.image_url}
              alt={image.alt}
              className={styles.image}
            />
          ))}
        </figure>
        <div className={styles.details}>
          <h5 className={styles.title}>{collection.collection_name}</h5>
          <p className={styles.subTitle}>{collectionLength} photos</p>
        </div>
      </Link>
    </article>
  );
}

export default CollectionCard;
