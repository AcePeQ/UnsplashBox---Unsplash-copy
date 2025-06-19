import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../api/authApi";

export interface ILoginData {
  email: string;
  password: string;
}

export function useLogin() {
  const { isPending, mutate: login } = useMutation({
    mutationFn: (loginData: ILoginData) => loginApi(loginData),
  });
  return {
    isPending,
    login,
  };
}
