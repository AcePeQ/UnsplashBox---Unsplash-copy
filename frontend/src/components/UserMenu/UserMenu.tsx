import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import styles from "./UserMenu.module.css";
import { useRef, useState } from "react";

const UserMenuNav = [
  { text: "Profile", link: "/" },
  { text: "Settings", link: "/" },
];

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuTimer = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
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

      <nav className={`${styles.nav} ${isOpen ? styles.navActive : ""}`}>
        <ul className={styles.list}>
          {UserMenuNav.map((link) => (
            <li className={styles.item}>
              <Link to={link.link} className={styles.link}>
                {link.text}
              </Link>
            </li>
          ))}
          <li className={styles.item}>
            <button
              className={styles.btn}
              onClick={() => navigate("/settings")}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </button>
  );
}

export default UserMenu;
