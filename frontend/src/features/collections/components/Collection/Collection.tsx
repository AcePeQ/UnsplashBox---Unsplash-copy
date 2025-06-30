import ImageCard from "../../../../components/ImageCard/ImageCard";
import Loading from "../../../../components/Loading/Loading";
import type { ICollection } from "../../../../types/collectionTypes";
import type { IImageTypes } from "../../../../types/imageTypes";

import Masonry from "react-masonry-css";
import styles from "./Collection.module.css";
import { useDeleteImageFromCollection } from "../../../imageSearch/useDeleteImageFromCollection";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

interface ICollectionType {
  collection?: ICollection;
  isError: boolean;
  isPending: boolean;
}

function Collection({ collection, isError, isPending }: ICollectionType) {
  const { removeImageFromCollection, isPending: isDeletingImage } =
    useDeleteImageFromCollection();

  if (isPending) {
    return <Loading />;
  }

  if (!collection || isError) {
    return null;
  }

  function handleDeleteImageFromCollection(imageID: string) {
    if (!collection?._id || !imageID) return;

    removeImageFromCollection({
      collection_id: collection?._id,
      image_id: imageID,
    });
  }

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles["my-masonry-grid"]}
      columnClassName={styles["my-masonry-grid_column"]}
    >
      {collection.collection.map((image: IImageTypes) => (
        <ImageCard
          key={image.id}
          image={image}
          type="delete"
          isDeleting={isDeletingImage}
          onDeleteImageFromCollection={handleDeleteImageFromCollection}
        />
      ))}
    </Masonry>
  );
}

export default Collection;
