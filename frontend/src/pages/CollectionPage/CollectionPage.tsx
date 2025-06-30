import { useParams } from "react-router-dom";
import styles from "./CollectionPage.module.css";
import Collection from "../../features/collections/components/Collection/Collection";
import { useGetCollection } from "../../features/collections/useGetCollection";

function CollectionPage() {
  const { collection_name } = useParams();

  const { data, isError, isPending } = useGetCollection(collection_name ?? "");

  const collectionLength = data?.collection.length;

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h1>{collection_name}</h1>
        <p>{collectionLength} photos</p>

        <Collection collection={data} isError={isError} isPending={isPending} />
      </div>
    </section>
  );
}

export default CollectionPage;
