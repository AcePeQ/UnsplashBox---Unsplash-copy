import { useUserStore } from "../../stores/useUserStore";
import styles from "./UserMenu.module.css";
import { useRef, useState } from "react";
import NavigationUserMenu from "../NavigationUserMenu/NavigationUserMenu";

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuTimer = useRef<NodeJS.Timeout | null>(null);
  const userPhoto = useUserStore((state) => state.user?.profilePicture);

  function handleOpenMenu() {
    if (menuTimer.current) {
      setIsOpen(true);
      clearTimeout(menuTimer.current);
    }
  }

  function handleCloseMenu() {
    menuTimer.current = setTimeout(() => {
      setIsOpen(false);
    }, 400);
  }

  return (
    <button
      onMouseEnter={handleOpenMenu}
      onMouseLeave={handleCloseMenu}
      className={styles.userMenu}
    >
      <img
        className={styles.userPhoto}
        src={userPhoto || "/user-avatar.png"}
        alt="user avatar"
      />

      <NavigationUserMenu isMenuOpen={isOpen} />
    </button>
  );
}

export default UserMenu;
