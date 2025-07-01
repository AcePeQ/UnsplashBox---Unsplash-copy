import CollectionCard from "../../../../components/CollectionCard/CollectionCard";
import Loading from "../../../../components/Loading/Loading";
import { useGetUserCollections } from "../../../collections/useGetUserCollections";
import styles from "./UserCollections.module.css";

function UserCollections() {
  const { data, isError, isPending } = useGetUserCollections();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return null;
  }

  console.log(data);

  return (
    <div className={styles.collections}>
      {data?.map((collectionItem) => (
        <CollectionCard
          key={collectionItem._id}
          type="profile"
          collection={collectionItem}
        />
      ))}
    </div>
  );
}

export default UserCollections;
