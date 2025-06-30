import styles from "./AddToCollectionForm.module.css";
import ImageCollectionCard from "../../../imageDetails/components/ImageCollectionCard/ImageCollectionCard";
import { useGetUserCollections } from "../../useGetUserCollections";
import Loading from "../../../../components/Loading/Loading";
import type { IImageTypes } from "../../../../types/imageTypes";
import AddCollectionButton from "../../../../components/AddCollectionButton/AddCollectionButton";

function AddToCollectionForm({
  image,
}: {
  onCloseModal: () => void;
  image: IImageTypes;
}) {
  const { data, isPending, isError } = useGetUserCollections();

  const userCollections = data?.filter((collection) => {
    const findedImageInCollection = collection.collection.find(
      (item) => item.id === image.id
    );

    return findedImageInCollection ? false : true;
  });

  return (
    <div className={styles.form}>
      <div className={styles.collection_cards}>
        {isPending && <Loading />}
        {isError && null}
        {!isPending &&
          !isError &&
          userCollections?.map((collection) => (
            <ImageCollectionCard
              key={collection._id}
              type="add"
              collection={collection}
              image={image}
            />
          ))}
        {userCollections?.length === 0 && <AddCollectionButton />}
      </div>
    </div>
  );
}

export default AddToCollectionForm;
