import { useForm, type SubmitHandler } from "react-hook-form";
import styles from "./CollectionForm.module.css";
import FormRow from "../../../../components/FormRow/FormRow";
import Button from "../../../../components/Button/Button";

export interface ICollectionAddInputs {
  collection_name: string;
}

function LoginForm({ onCloseModal }: { onCloseModal: () => void }) {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<ICollectionAddInputs>();

  const onSubmit: SubmitHandler<ICollectionAddInputs> = (data) => {
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Collection Name"
        error={errors.collection_name?.message as string}
      >
        <input
          id="collection_name"
          type="text"
          placeholder=" "
          aria-invalid={errors.collection_name ? true : false}
          {...register("collection_name", {
            required: "Email field is required",
          })}
        />
      </FormRow>

      <div className={styles.btns}>
        <Button
          buttonType="primary-outline"
          type="button"
          onClick={() => {
            onCloseModal();
          }}
        >
          Close
        </Button>
        <Button type="submit">Add</Button>
      </div>
    </form>
  );
}

export default LoginForm;
