import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../../api/authApi";
import { toast } from "react-toastify";

export interface IRegisterData {
  email: string;
  password: string;
}

export function useRegister() {
  const { isPending, mutate: register } = useMutation({
    mutationFn: (registerData: IRegisterData) => registerApi(registerData),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {
    isPending,
    register,
  };
}
