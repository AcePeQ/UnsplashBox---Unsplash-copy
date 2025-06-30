import Loading from "../../../../components/Loading/Loading";
import type { ICollection } from "../../../../types/collectionTypes";
import type { IImageTypes } from "../../../../types/imageTypes";
import { useGetImageCollections } from "../../useGetImageCollections";
import ImageCollectionCard from "../ImageCollectionCard/ImageCollectionCard";
import styles from "./ImageCollections.module.css";

function ImageCollections({ image }: { image: IImageTypes }) {
  const { data, isPending, isError } = useGetImageCollections(image.id);

  return (
    <div className={styles.collections}>
      <p className={styles.title}>Collections</p>

      <div className={styles.collection_cards}>
        {isPending && <Loading />}
        {isError && null}
        {data?.length === 0 && (
          <p>This image isn't in any of your collections</p>
        )}
        {data &&
          data.map((collection: ICollection) => (
            <ImageCollectionCard
              key={collection._id}
              collection={collection}
              image={image}
              type="delete"
            />
          ))}
      </div>
    </div>
  );
}

export default ImageCollections;
