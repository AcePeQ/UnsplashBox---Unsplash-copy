import { useMutation } from "@tanstack/react-query";
import { createCollection } from "../../api/collectionsApi";

export function useCreateCollection() {
  const { isPending, mutate: createCollectionFn } = useMutation({
    mutationFn: (collectionData: { collection_name: string }) =>
      createCollection(collectionData),
  });

  return { createCollectionFn, isPending };
}
