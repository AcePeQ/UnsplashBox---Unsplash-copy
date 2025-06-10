import { Search } from "lucide-react";
import styles from "./ImageSearch.module.css";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  query: string;
};

function ImageSearch() {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {};

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter your keywords..."
          {...register("query", { required: true, minLength: 1 })}
        />
        <button className={styles.buttonSearch} type="submit">
          <Search className={styles.buttonSearchIcon} />
        </button>
      </div>
    </form>
  );
}

export default ImageSearch;
