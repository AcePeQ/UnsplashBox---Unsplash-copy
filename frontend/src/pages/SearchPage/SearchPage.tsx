import ImageSearch from "../../features/imageSearch/components/ImageSearch/ImageSearch";
import SearchResult from "../../features/imageSearch/components/SearchResult/SearchResult";

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
