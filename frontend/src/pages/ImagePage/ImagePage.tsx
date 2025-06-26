import ImageDetails from "../../features/imageDetails/components/ImageDetails/ImageDetails";
import styles from "./ImagePage.module.css";

function ImagePage() {
  return (
    <section className={styles.section}>
      <ImageDetails />
    </section>
  );
}

export default ImagePage;
