import UserCollections from "../../features/userProfile/components/UserCollections/UserCollections";
import UserProfile from "../../features/userProfile/components/UserProfile/UserProfile";
import styles from "./ProfilePage.module.css";

function ProfilePage() {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <UserProfile />
        <UserCollections />
      </div>
    </section>
  );
}

export default ProfilePage;
