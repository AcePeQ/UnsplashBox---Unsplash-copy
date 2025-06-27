import AddCollectionButton from "../../../../components/AddCollectionButton/AddCollectionButton";
import CollectionCard from "../../../../components/CollectionCard/CollectionCard";
import Loading from "../../../../components/Loading/Loading";
import { useGetUserCollections } from "../../useGetUserCollections";

import styles from "./Collections.module.css";

function Collections() {
  const { data, isError, isPending } = useGetUserCollections();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return null;
  }

  return (
    <div className={styles.collections}>
      {data?.map((collectionItem) => (
        <CollectionCard key={collectionItem._id} collection={collectionItem} />
      ))}

      <AddCollectionButton />
    </div>
  );
}

export default Collections;
