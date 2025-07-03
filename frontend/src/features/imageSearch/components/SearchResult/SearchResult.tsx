import Masonry from "react-masonry-css";
import styles from "./SearchResult.module.css";
import { useParams } from "react-router-dom";
import { useGetSearchResult } from "../../useGetSearchResult";
import type { IUnsplashImage } from "../../../../types/unsplashTypes";
import Loading from "../../../../components/Loading/Loading";
import type { IImageTypes } from "../../../../types/imageTypes";
import ImageCard from "../../../../components/ImageCard/ImageCard";
import Button from "../../../../components/Button/Button";

const breakpointColumnsObj = {
  default: 4,
  1280: 3,
  850: 2,
  600: 1,
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
        download_link: item.links.download_location,
        user_name: item.user.name,
        user_profile_link: item.user.links.html,
      };
    });
    return results;
  });

  return status === "pending" ? (
    <Loading />
  ) : status === "error" ? (
    <p className={styles.margin}>Error: {error?.message}</p>
  ) : (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles["my-masonry-grid"]}
        columnClassName={styles["my-masonry-grid_column"]}
      >
        {imagesResults?.map((img: IImageTypes) => (
          <ImageCard key={img.id} image={img} />
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

      {isFetching && !isFetchingNextPage ? <Loading /> : null}
    </>
  );
}

export default SearchResult;
