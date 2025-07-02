import { useMutation } from "@tanstack/react-query";

import { updateProfileImageApi } from "../../api/authApi";

export function useUpdateImageProfile() {
  const { isPending, mutate: updateProfileImage } = useMutation({
    mutationFn: (imageData: { profilePicture: string }) =>
      updateProfileImageApi(imageData),
  });

  return { isPending, updateProfileImage };
}
