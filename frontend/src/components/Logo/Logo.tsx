import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <div className={styles.logo_wrapper}>
      <Link to="/">
        <img
          className={styles.logo}
          src="/logos/Logo.svg"
          alt="logo of UnsplashBox company"
        ></img>
      </Link>
    </div>
  );
}

export default Logo;
