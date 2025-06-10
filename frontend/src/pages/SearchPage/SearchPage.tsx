import ImageSearch from "../../features/imageSearch/ImageSearch";
import SearchResult from "../../features/imageSearch/SearchResult";
import styles from "./SearchPage.module.css";

function SearchPage() {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <ImageSearch />
        <SearchResult />
      </div>
    </section>
  );
}

export default SearchPage;
