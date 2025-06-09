import type { ReactElement } from "react";
import styles from "./Button.module.css";

interface IButton {
  buttonType: string;
  onClick: () => void;
  children: string | ReactElement;
}

function Button({
  children,
  buttonType = "primary",
  onClick,
  ...props
}: IButton) {
  return (
    <button
      {...props}
      className={`${styles.btn} ${styles[buttonType]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
