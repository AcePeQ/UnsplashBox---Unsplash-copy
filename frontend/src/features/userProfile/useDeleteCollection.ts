import { useMutation } from "@tanstack/react-query";
import { deleteCollectionApi } from "../../api/collectionsApi";

export function useDeleteCollection() {
  const { isPending: isDeleting, mutate: deleteCollection } = useMutation({
    mutationFn: (collectionData: { collection_id: string }) =>
      deleteCollectionApi(collectionData),
  });

  return { deleteCollection, isDeleting };
}
