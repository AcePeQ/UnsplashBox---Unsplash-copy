import type { ReactElement } from "react";
import styles from "./FormRow.module.css";

interface IFormRow {
  label: string;
  error: string;
  children: ReactElement<HTMLInputElement>;
}

function FormRow({ label, error, children }: IFormRow) {
  return (
    <div className={styles.row}>
      <label htmlFor={children.props.id as string} className={styles.label}>
        {label}
      </label>
      {children}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default FormRow;
