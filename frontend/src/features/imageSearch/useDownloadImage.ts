import { useMutation } from "@tanstack/react-query";
import { downloadImageApi } from "../../api/imageApi";

export function useDownloadImage() {
  const { mutate: downloadImage } = useMutation({
    mutationFn: ({ download_location }: { download_location: string }) =>
      downloadImageApi(download_location),
    onError: () => {},
  });

  return { downloadImage };
}
