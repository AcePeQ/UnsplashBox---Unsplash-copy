import { useQuery } from "@tanstack/react-query";
import { getImageCollections } from "../../api/collectionsApi";
import type { ICollection } from "../../types/collectionTypes";

export function useGetImageCollections(imageId: string) {
  const { data, isError, error, isPending } = useQuery<ICollection[]>({
    queryKey: ["imageCollections", imageId],
    queryFn: () => getImageCollections(imageId),
  });

  return { data, isError, error, isPending };
}
