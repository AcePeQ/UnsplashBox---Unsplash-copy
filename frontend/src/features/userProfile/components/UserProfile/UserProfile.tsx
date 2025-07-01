import styles from "./UserProfile.module.css";
import { useUserStore } from "../../../../stores/useUserStore";
import { ImageUp } from "lucide-react";

function UserProfile() {
  const user = useUserStore((state) => state.user);

  console.log(user);

  const formattedDate = new Date(user?.created_at as string).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <article className={styles.userInformations}>
      <figure className={styles.imageWrapper}>
        <img
          src={user?.profilePicture || "/user-avatar.png"}
          alt={`avatar of ${user?.username}`}
        />
        <label htmlFor="avatar-upload">
          <ImageUp className={styles.icon} />
          <input
            type="file"
            id="avatar-upload"
            className="hidden"
            onChange={() => {}}
          />
        </label>
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
