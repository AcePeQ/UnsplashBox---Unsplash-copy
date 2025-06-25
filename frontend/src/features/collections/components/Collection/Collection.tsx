import ImageCard from "../../../../components/ImageCard/ImageCard";
import styles from "./Collection.module.css";

import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

function Collection() {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles["my-masonry-grid"]}
      columnClassName={styles["my-masonry-grid_column"]}
    >
      {/* <ImageCard key={img.id} image={img} /> */}
    </Masonry>
  );
}

export default Collection;
