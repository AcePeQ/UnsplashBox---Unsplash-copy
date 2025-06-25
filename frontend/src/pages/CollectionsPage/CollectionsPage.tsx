import Collections from "../../features/collections/components/Collections/Collections";
import { useUserStore } from "../../stores/useUserStore";
import styles from "./CollectionsPage.module.css";

function CollectionsPage() {
  const isLoggedIn = useUserStore((state) => state.user);

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h1>Collections</h1>
        <p>
          Explore the world through collections of beautiful
          <br />
          photos free to use under the{" "}
          <a className={styles.link} href="#" target="_blank">
            Unsplash License
          </a>
          .
        </p>

        {isLoggedIn ? (
          <Collections />
        ) : (
          <p className={styles.notification}>
            You have to be logged in to create collections
          </p>
        )}
      </div>
    </section>
  );
}

export default CollectionsPage;
