import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loading}></div>

      <div className={styles.loading_2}></div>
    </div>
  );
}

export default Loading;
