import styles from "./LoadingFull.module.css";

function LoadingFull() {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loading}></div>

      <div className={styles.loading_2}></div>
    </div>
  );
}

export default LoadingFull;
