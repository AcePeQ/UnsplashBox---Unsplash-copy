import { useForm, type SubmitHandler } from "react-hook-form";
import styles from "./RegisterForm.module.css";
import FormRow from "../../../../components/FormRow/FormRow";
import Button from "../../../../components/Button/Button";

export interface IRegisterInputs {
  email: string;
  password: string;
  username: string;
}

function RegisterForm({ onCloseModal }: { onCloseModal: () => void }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRegisterInputs>();

  const onSubmit: SubmitHandler<IRegisterInputs> = (data) => {
    console.log(data);
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
        <input
          id="password"
          type="text"
          aria-invalid={errors.password ? true : false}
          placeholder=" "
          {...register("password", {
            required: "Password field is required",
          })}
        />
      </FormRow>

      <div className={styles.btns}>
        <Button
          buttonType="primary-outline"
          type="button"
          onClick={() => {
            reset();
            onCloseModal();
          }}
        >
          Close
        </Button>
        <Button type="submit">Register</Button>
      </div>
    </form>
  );
}

export default RegisterForm;
