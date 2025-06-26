import { useQuery } from "@tanstack/react-query";
import { getImageApi } from "../../api/imageApi";
import type { IUnsplashImage } from "../../types/unsplashTypes";

export function useGetImageDetails(imageId: string) {
  const { data, isError, error, isPending } = useQuery<IUnsplashImage>({
    queryKey: ["imageDetails", imageId],
    queryFn: () => getImageApi(imageId),
  });

  return { data, isError, error, isPending };
}
