import { Link } from "react-router-dom";
import styles from "./ImageCard.module.css";
import Button from "../Button/Button";
import type { IImageTypes } from "../../types/imageTypes";
import { useDownloadImage } from "../../features/imageSearch/useDownloadImage";

interface ImageCardProps {
  image: IImageTypes;
}

function ImageCard({ image }: ImageCardProps) {
  const { downloadImage } = useDownloadImage();

  return (
    <figure>
      <Link
        className={styles.imageLink}
        to="/"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("button")) e.preventDefault();
        }}
      >
        <img src={image.image_url} />
        <div className={styles.imageOverlay}>
          <Button
            aria-label="Add to collection"
            buttonType="secondary"
            onClick={() => {}}
          >
            Add
          </Button>

          <button
            onClick={() => {
              window.open(image.user_profile_link);
            }}
            aria-label="redirect to Unsplash author profile"
            className={styles.userName}
          >
            Author: {image.user_name}
          </button>

          <Button
            aria-label="Download"
            buttonType="secondary"
            onClick={() => {
              downloadImage({ download_location: image.download_link });
            }}
          >
            Download
          </Button>
        </div>
      </Link>
    </figure>
  );
}

export default ImageCard;
