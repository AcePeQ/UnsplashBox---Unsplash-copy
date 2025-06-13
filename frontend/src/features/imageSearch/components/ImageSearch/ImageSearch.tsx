import { Search } from "lucide-react";
import styles from "./ImageSearch.module.css";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

type Inputs = {
  query: string;
};

function ImageSearch() {
  const navigate = useNavigate();
  const { query: querySearch } = useParams();
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    navigate(`/search/${data.query}`);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="text"
          defaultValue={querySearch || ""}
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
