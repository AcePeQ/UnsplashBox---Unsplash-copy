import { useParams } from "react-router-dom";
import styles from "./CollectionPage.module.css";
import Collection from "../../features/collections/components/Collection/Collection";

function CollectionPage() {
  const { collection_name } = useParams();

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h1>{collection_name}</h1>
        <p>16 photos</p>

        <Collection />
      </div>
    </section>
  );
}

export default CollectionPage;
