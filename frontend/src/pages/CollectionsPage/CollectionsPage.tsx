import CollectionCard from "../../components/CollectionCard/CollectionCard";
import styles from "./CollectionsPage.module.css";

function CollectionsPage() {
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

        <div className={styles.collections}>
          <CollectionCard />
          <CollectionCard />
        </div>
      </div>
    </section>
  );
}

export default CollectionsPage;
