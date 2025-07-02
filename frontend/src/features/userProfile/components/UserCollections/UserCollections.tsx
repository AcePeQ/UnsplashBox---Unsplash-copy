import { toast } from "react-toastify";
import CollectionCard from "../../../../components/CollectionCard/CollectionCard";
import Loading from "../../../../components/Loading/Loading";
import { useGetUserCollections } from "../../../collections/useGetUserCollections";
import { useDeleteCollection } from "../../useDeleteCollection";
import styles from "./UserCollections.module.css";
import { useQueryClient } from "@tanstack/react-query";

function UserCollections() {
  const queryClient = useQueryClient();
  const { deleteCollection, isDeleting } = useDeleteCollection();
  const { data, isError, isPending } = useGetUserCollections();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return null;
  }

  function handleDeleteCollection(collectionId: string) {
    deleteCollection(
      { collection_id: collectionId },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          queryClient.invalidateQueries({ queryKey: ["userCollections"] });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  }

  return (
    <div className={styles.collections}>
      {data?.map((collectionItem) => (
        <CollectionCard
          key={collectionItem._id}
          type="profile"
          collection={collectionItem}
          onDeleteCollection={handleDeleteCollection}
          isDeletingCollection={isDeleting}
        />
      ))}
    </div>
  );
}

export default UserCollections;
