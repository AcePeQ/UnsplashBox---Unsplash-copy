import ImageSearch from "../../features/imageSearch/components/ImageSearch/ImageSearch";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h1>Search</h1>
        <p>Search high-resolution images from Unsplash</p>
        <ImageSearch />
      </div>
    </section>
  );
}

export default HomePage;
