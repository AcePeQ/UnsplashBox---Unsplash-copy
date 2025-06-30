import { useParams } from "react-router-dom";
import ImageCollections from "../ImageCollections/ImageCollections";
import styles from "./ImageDetails.module.css";
import { useGetImageDetails } from "../../useGetImageDetails";
import Loading from "../../../../components/Loading/Loading";
import Button from "../../../../components/Button/Button";
import { useDownloadImage } from "../../../imageSearch/useDownloadImage";
import AddToCollectionButton from "../../../../components/AddToCollectionButton/AddToCollectionButton";

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

  const formattedDate = new Date(data.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className={styles.details}>
      <figure className={styles.imageWrapper}>
        <img src={data?.urls.full} alt={data?.alt_description} />
      </figure>

      <div>
        <div className={styles.authorInformations}>
          <div className={styles.author}>
            <img
              src={data?.user.profile_image.medium}
              alt={`Photo of the author: ${data.user.name}`}
            />
            <p>{data?.user.name}</p>
          </div>

          <p className={styles.publish_date}>Published on {formattedDate}</p>

          <div className={styles.btns}>
            <AddToCollectionButton
              buttonText="Add To Collection"
              buttonType="primary"
              image={{
                alt: data.alt_description,
                created_at: data.created_at,
                image_url: data.urls.raw,
                id: data.id,
                download_link: data.links.download,
                user_name: data.user.name,
                user_profile_link: data.user.links.html,
              }}
            />

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

        <ImageCollections
          image={{
            alt: data.alt_description,
            created_at: data.created_at,
            image_url: data.urls.raw,
            id: data.id,
            download_link: data.links.download,
            user_name: data.user.name,
            user_profile_link: data.user.links.html,
          }}
        />
      </div>
    </article>
  );
}

export default ImageDetails;
