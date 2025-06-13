import { useMutation } from "@tanstack/react-query";
import { downloadImageApi } from "../../api/imageApi";
import { toast } from "react-toastify";

export function useDownloadImage() {
  const { mutate: downloadImage } = useMutation({
    mutationFn: ({ download_location }: { download_location: string }) =>
      downloadImageApi(download_location),
    onSuccess: () => toast.success("Download successfully"),
    onError: (error) => toast.error(error.message),
  });

  return { downloadImage };
}
