import { Link } from "react-router-dom";
import styles from "./ImageCollectionCard.module.css";
import { Minus, Plus } from "lucide-react";
import type { ICollection } from "../../../../types/collectionTypes";
import type { IImageTypes } from "../../../../types/imageTypes";
import { useAddImageToCollection } from "../../../imageSearch/useAddImageToCollection";
import type React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteImageFromCollection } from "../../../imageSearch/useDeleteImageFromCollection";

function ImageCollectionCard({
  type = "delete",
  collection,
  image,
}: {
  type?: string;
  collection?: ICollection;
  image: IImageTypes;
}) {
  const queryClient = useQueryClient();
  const { addImageToCollection, isPending: isAdding } =
    useAddImageToCollection();
  const { removeImageFromCollection, isPending: isRemoving } =
    useDeleteImageFromCollection();

  function handleAddImageToCollection(e: React.MouseEvent) {
    e.preventDefault();

    if (collection) {
      addImageToCollection(
        { collection_id: collection._id, image },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["userCollections"],
            });
            queryClient.invalidateQueries({ queryKey: ["imageCollections"] });
          },
        }
      );
    }
  }

  function handleRemoveImageFromCollection(e: React.MouseEvent) {
    e.preventDefault();

    if (collection) {
      removeImageFromCollection(
        { collection_id: collection._id, image_id: image.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["imageCollections"] });
          },
        }
      );
    }
  }

  const collectionLength = collection?.collection.length;
  return (
    <Link
      to={`/collection/${collection?.collection_name}`}
      className={styles.collection_card}
    >
      <div className={styles.card_header}>
        {collectionLength === 0 ? (
          <div className={styles.placeholder}></div>
        ) : (
          <img src={collection?.collection[0].image_url} />
        )}

        <div className={styles.card_details}>
          <p className={styles.card_title}>{collection?.collection_name}</p>
          <p className={styles.card_numberOfPhotos}>
            {collectionLength} Photos
          </p>
        </div>
      </div>
      {type === "delete" && (
        <button
          onClick={handleRemoveImageFromCollection}
          className={styles.removeButton}
          disabled={isRemoving}
        >
          <Minus className={styles.icon} />
          Remove
        </button>
      )}

      {type === "add" && (
        <button
          onClick={handleAddImageToCollection}
          className={styles.removeButton}
          disabled={isAdding}
        >
          <Plus className={styles.icon} />
          Add to collection
        </button>
      )}
    </Link>
  );
}

export default ImageCollectionCard;
