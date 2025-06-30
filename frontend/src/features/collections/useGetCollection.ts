import { useQuery } from "@tanstack/react-query";
import { getCollection } from "../../api/collectionsApi";
import type { ICollection } from "../../types/collectionTypes";

export function useGetCollection(collection_name: string) {
  const { data, isPending, isError, error } = useQuery<ICollection>({
    queryKey: ["userCollection", collection_name],
    queryFn: () => getCollection(collection_name),
  });

  return { data, isPending, isError, error };
}
