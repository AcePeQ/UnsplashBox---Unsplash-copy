import { Link } from "react-router-dom";
import styles from "./CollectionCard.module.css";
import type { ICollection } from "../../types/collectionTypes";
import Button from "../Button/Button";

function CollectionCard({
  collection,
  type,
  onDeleteCollection,
  isDeletingCollection,
}: {
  collection: ICollection;
  type?: string;
  isDeletingCollection?: boolean;
  onDeleteCollection?: (collection_id: string) => void;
}) {
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
              key={image._id}
              src={image.image_url}
              alt={image.alt}
              className={`${styles.image} ${
                collectionLength === 1
                  ? styles.soloImage
                  : collectionLength === 2
                  ? styles.doubleImage
                  : ""
              }`}
            />
          ))}
        </figure>
        {type === "profile" ? (
          <div className={styles.details}>
            <div>
              <h5 className={styles.title}>{collection.collection_name}</h5>
              <p className={styles.subTitle}>{collectionLength} photos</p>
            </div>
            <Button
              disabled={isDeletingCollection}
              onClick={(e) => {
                e.preventDefault();

                if (onDeleteCollection) onDeleteCollection(collection._id);
              }}
              buttonType="primary"
            >
              Delete
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.details}>
              <h5 className={styles.title}>{collection.collection_name}</h5>
              <p className={styles.subTitle}>{collectionLength} photos</p>
            </div>
          </>
        )}
      </Link>
    </article>
  );
}

export default CollectionCard;
