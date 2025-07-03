import styles from "./ImageCard.module.css";

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import type { IImageTypes } from "../../types/imageTypes";
import { useDownloadImage } from "../../features/imageSearch/useDownloadImage";
import AddToCollectionButton from "../AddToCollectionButton/AddToCollectionButton";
import { Download } from "lucide-react";

interface ImageCardProps {
  image: IImageTypes;
  type?: string;
  isDeleting?: boolean;
  onDeleteImageFromCollection?: (imageID: string) => void;
}

function ImageCard({
  image,
  type = "add",
  isDeleting,
  onDeleteImageFromCollection,
}: ImageCardProps) {
  const { downloadImage } = useDownloadImage();

  return (
    <motion.figure
      initial={{ opacity: 0, y: "12px" }}
      animate={{ opacity: 1, y: "0px" }}
      transition={{ duration: 0.8 }}
    >
      <Link
        className={styles.imageLink}
        to={`/image/${image.id}`}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("button")) e.preventDefault();
        }}
      >
        <img src={image.image_url} />
        <div className={styles.imageOverlay}>
          {type === "add" ? (
            <AddToCollectionButton
              buttonText="Add"
              buttonType="secondary"
              image={image}
            />
          ) : (
            <Button
              disabled={isDeleting}
              onClick={() => {
                if (onDeleteImageFromCollection)
                  onDeleteImageFromCollection(image.id);
              }}
              type="button"
              buttonType="secondary"
            >
              Remove
            </Button>
          )}

          <button
            onClick={() => {
              window.open(image.user_profile_link);
            }}
            aria-label="redirect to Unsplash author profile"
            className={styles.userName}
          >
            Author: <br /> {image.user_name}
          </button>

          <Button
            aria-label="Download"
            buttonType="secondary"
            onClick={() => {
              downloadImage({ download_location: image.download_link });
            }}
          >
            <Download />
          </Button>
        </div>
      </Link>
    </motion.figure>
  );
}

export default ImageCard;
