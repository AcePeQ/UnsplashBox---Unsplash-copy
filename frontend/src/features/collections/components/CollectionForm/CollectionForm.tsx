import { useForm, type SubmitHandler } from "react-hook-form";
import styles from "./CollectionForm.module.css";
import FormRow from "../../../../components/FormRow/FormRow";
import Button from "../../../../components/Button/Button";
import { useCreateCollection } from "../../useCreateCollection";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export interface ICollectionAddInputs {
  collection_name: string;
}

function LoginForm({ onCloseModal }: { onCloseModal: () => void }) {
  const queryClient = useQueryClient();
  const { createCollectionFn, isPending } = useCreateCollection();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICollectionAddInputs>();

  const onSubmit: SubmitHandler<ICollectionAddInputs> = (data) => {
    createCollectionFn(data, {
      onSuccess: (data) => {
        reset();
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["userCollections"] });
        onCloseModal();
      },
      onError: (error) => {
        reset();
        toast.error(error.message);
      },
    });
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
            required: "Collection name field is required",
          })}
        />
      </FormRow>

      <div className={styles.btns}>
        <Button
          buttonType="primary-outline"
          type="button"
          disabled={isPending}
          onClick={() => {
            onCloseModal();
          }}
        >
          Close
        </Button>
        <Button disabled={isPending} type="submit">
          Add
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
