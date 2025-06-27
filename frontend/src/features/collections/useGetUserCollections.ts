import { useQuery } from "@tanstack/react-query";
import { getUserCollections } from "../../api/collectionsApi";
import type { ICollection } from "../../types/collectionTypes";

export function useGetUserCollections() {
  const { data, isPending, isError, error } = useQuery<ICollection[]>({
    queryKey: ["userCollections"],
    queryFn: getUserCollections,
  });

  return { data, isPending, isError, error };
}
