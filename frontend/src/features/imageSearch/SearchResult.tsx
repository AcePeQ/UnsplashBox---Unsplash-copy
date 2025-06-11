import Masonry from "react-masonry-css";
import Button from "../../components/Button/Button";
import styles from "./SearchResult.module.css";
import { useGetSearchResult } from "./useGetSearchResult";
import { useParams } from "react-router-dom";
import type { IUnsplashImage } from "../../types/unsplashTypes";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

function SearchResult() {
  const { query } = useParams();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useGetSearchResult(query);

  const imagesResults = data?.pages.flatMap((page) => {
    const results = page.results.map((item: IUnsplashImage) => {
      return {
        alt: item.alt_description,
        created_at: item.created_at,
        image_url: item.urls.small,
        id: item.id,
        download_link: item.links.download,
        user_name: item.user.name,
        user_profile_image: item.user.profile_image.small,
      };
    });
    return results;
  });

  console.log(imagesResults);

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error?.message}</p>
  ) : (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles["my-masonry-grid"]}
        columnClassName={styles["my-masonry-grid_column"]}
      >
        {imagesResults?.map((img, index) => (
          <figure key={index}>
            <img src={img.image_url} />
          </figure>
        ))}
      </Masonry>
      <div className={styles.buttonWrapper}>
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetching}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </div>
      <p>{isFetching && !isFetchingNextPage ? "Loading..." : null}</p>
    </>
  );
}

export default SearchResult;
