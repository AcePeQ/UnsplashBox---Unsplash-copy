import { useParams } from "react-router-dom";
import ImageCollections from "../ImageCollections/ImageCollections";
import styles from "./ImageDetails.module.css";
import { useGetImageDetails } from "../../useGetImageDetails";
import Loading from "../../../../components/Loading/Loading";
import Button from "../../../../components/Button/Button";
import { useDownloadImage } from "../../../imageSearch/useDownloadImage";

function ImageDetails() {
  const { image_id } = useParams();
  const { downloadImage } = useDownloadImage();

  const { data, isPending, isError } = useGetImageDetails(image_id ?? "");

  if (isPending) {
    return <Loading />;
  }

  if (isError || !data) {
    return null;
  }

  console.log(data);

  const formattedDate = new Date(data.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className={styles.details}>
      <figure className={styles.imageWrapper}>
        <img src={data?.urls.small} alt={data?.alt_description} />
      </figure>

      <div>
        <div className={styles.authorInformations}>
          <div className={styles.author}>
            <img src={data?.user.profile_image.medium} alt="" />
            <p>{data?.user.name}</p>
          </div>

          <p className={styles.publish_date}>Published on {formattedDate}</p>

          <div className={styles.btns}>
            <Button
              aria-label="Add to collection"
              buttonType="primary"
              onClick={() => {
                downloadImage({ download_location: data.links.download });
              }}
            >
              Add to Collection
            </Button>
            <Button
              aria-label="Download"
              buttonType="primary-outline"
              onClick={() => {
                downloadImage({ download_location: data.links.download });
              }}
            >
              Download
            </Button>
          </div>
        </div>

        <ImageCollections />
      </div>
    </article>
  );
}

export default ImageDetails;
