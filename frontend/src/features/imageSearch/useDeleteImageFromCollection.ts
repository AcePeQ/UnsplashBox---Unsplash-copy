import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeImageFromCollectionApi } from "../../api/imageApi";
import { toast } from "react-toastify";

export function useDeleteImageFromCollection() {
  const queryClient = useQueryClient();

  const { isPending, mutate: removeImageFromCollection } = useMutation({
    mutationFn: (imageData: { collection_id: string; image_id: string }) =>
      removeImageFromCollectionApi(imageData),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["userCollection"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { removeImageFromCollection, isPending };
}
