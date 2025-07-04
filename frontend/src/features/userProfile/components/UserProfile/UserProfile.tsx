import styles from "./UserProfile.module.css";
import { useUserStore } from "../../../../stores/useUserStore";
import { ImageUp } from "lucide-react";
import { useUpdateImageProfile } from "../../useUpdateImageProfile";
import { toast } from "react-toastify";
import Loading from "../../../../components/Loading/Loading";

function UserProfile() {
  const user = useUserStore((state) => state.user);
  const login = useUserStore((state) => state.login);
  const { updateProfileImage, isPending } = useUpdateImageProfile();

  const formattedDate = new Date(user?.createdAt as string).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    if (!allowedImageTypes.includes(file.type)) {
      toast.error("There is only image available: JPG, PNG, WEBP, GIF.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const imageBase64 = reader.result as string;
      updateProfileImage(
        { profilePicture: imageBase64 },
        {
          onSuccess: (data) => {
            login(data);
            sessionStorage.setItem("user", JSON.stringify(data));
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    };
  }

  return (
    <article className={styles.userInformations}>
      <figure className={styles.imageWrapper}>
        {isPending && <Loading />}
        {!isPending && (
          <>
            <img
              src={user?.profilePicture || "/user-avatar.png"}
              alt={`avatar of ${user?.username}`}
            />
            <label htmlFor="avatar-upload">
              <ImageUp className={styles.icon} />
              <input
                disabled={isPending}
                type="file"
                id="avatar-upload"
                className="hidden"
                onChange={(e) => handleImageChange(e)}
              />
            </label>
          </>
        )}
      </figure>
      <h1 className={styles.title}>{user?.username}</h1>
      <p className={styles.subText}>
        You are with us since:
        <span>{formattedDate}</span>
      </p>
    </article>
  );
}

export default UserProfile;
