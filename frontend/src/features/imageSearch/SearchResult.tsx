import { useState } from "react";
import styles from "./SearchResult.module.css";
import { useGetSearchResult } from "./useGetSearchResult";
import { useParams } from "react-router-dom";

function SearchResult() {
  const { query } = useParams();
  const [page, setPage] = useState(1);

  const { data, isPending, error, isError, isFetched, isPlaceholderData } =
    useGetSearchResult(query, page);

  return (
    <div className={styles.resultWrapper}>
      {isError && <p>{error?.message}</p>}
    </div>
  );
}

export default SearchResult;
