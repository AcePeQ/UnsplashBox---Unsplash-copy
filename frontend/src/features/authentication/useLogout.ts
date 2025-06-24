import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "../../api/authApi";

export function useLogout() {
  const { isPending, mutate: logout } = useMutation({
    mutationFn: () => logoutApi(),
  });
  return {
    isPending,
    logout,
  };
}
