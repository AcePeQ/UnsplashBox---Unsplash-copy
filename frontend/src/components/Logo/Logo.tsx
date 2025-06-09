import styles from "./Logo.module.css";

function Logo() {
  return (
    <div className={styles.logo_wrapper}>
      <img
        className={styles.logo}
        src="/logos/Logo.svg"
        alt="logo of UnsplashBox company"
      ></img>
    </div>
  );
}

export default Logo;
