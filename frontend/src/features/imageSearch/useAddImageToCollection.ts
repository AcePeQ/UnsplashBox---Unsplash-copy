import { useMutation } from "@tanstack/react-query";
import type { IImageTypes } from "../../types/imageTypes";
import { addImageToCollectionApi } from "../../api/imageApi";

export function useAddImageToCollection() {
  const { isPending, mutate: addImageToCollection } = useMutation({
    mutationFn: (imageData: { collection_id: string; image: IImageTypes }) =>
      addImageToCollectionApi(imageData),
  });

  return { addImageToCollection, isPending };
}
