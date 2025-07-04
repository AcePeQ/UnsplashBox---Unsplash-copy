import { useForm, type SubmitHandler } from "react-hook-form";
import FormRow from "../../../../components/FormRow/FormRow";

import styles from "./LoginForm.module.css";
import Button from "../../../../components/Button/Button";
import { useLogin } from "../../useLogin";
import { useUserStore } from "../../../../stores/useUserStore";
import type { TUser } from "../../../../types/userTypes";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface ILoginInputs {
  email: string;
  password: string;
}

function LoginForm({ onCloseModal }: { onCloseModal: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  const { login, isPending } = useLogin();
  const loginToAccount = useUserStore((state) => state.login);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginInputs>();

  const onSubmit: SubmitHandler<ILoginInputs> = (data) => {
    login(data, {
      onSuccess: (userData: TUser) => {
        loginToAccount(userData);
        sessionStorage.setItem("user", JSON.stringify(userData));
        reset();
        onCloseModal();
      },
      onError: () => {
        reset();
      },
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Email" error={errors.email?.message as string}>
        <input
          id="email-login"
          type="email"
          placeholder=" "
          aria-invalid={errors.email ? true : false}
          {...register("email", {
            required: "Email field is required",
          })}
        />
      </FormRow>

      <FormRow label="Password" error={errors.password?.message as string}>
        <div>
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={styles.showPassword}
          >
            {showPassword ? (
              <Eye className={styles.icon} />
            ) : (
              <EyeOff className={styles.icon} />
            )}
          </button>
          <input
            id="password-login"
            className={styles.passwordInput}
            type={`${showPassword ? "type" : "password"}`}
            aria-invalid={errors.password ? true : false}
            placeholder=" "
            {...register("password", {
              required: "Password field is required",
            })}
          />
        </div>
      </FormRow>

      <div className={styles.btns}>
        <Button
          disabled={isPending}
          buttonType="primary-outline"
          type="button"
          onClick={() => {
            reset();
            onCloseModal();
          }}
        >
          Close
        </Button>
        <Button disabled={isPending} type="submit">
          Login
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
