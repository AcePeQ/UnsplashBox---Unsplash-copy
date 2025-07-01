import { useForm, type SubmitHandler } from "react-hook-form";
import styles from "./RegisterForm.module.css";
import FormRow from "../../../../components/FormRow/FormRow";
import Button from "../../../../components/Button/Button";
import { useRegister } from "../../useRegister";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export interface IRegisterInputs {
  email: string;
  password: string;
  username: string;
}

function RegisterForm({ onCloseModal }: { onCloseModal: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const { register: createAccount, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRegisterInputs>();

  const onSubmit: SubmitHandler<IRegisterInputs> = (data) => {
    createAccount(data, {
      onSuccess: () => {
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
          id="email"
          type="text"
          placeholder=" "
          aria-invalid={errors.email ? true : false}
          {...register("email", {
            required: "Email field is required",
          })}
        />
      </FormRow>

      <FormRow label="Username" error={errors.username?.message as string}>
        <input
          id="username"
          type="text"
          placeholder=" "
          aria-invalid={errors.username ? true : false}
          {...register("username", {
            required: "Username field is required",
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
              <EyeOff className={styles.icon} />
            ) : (
              <Eye className={styles.icon} />
            )}
          </button>
          <input
            id="password"
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
          Register
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
