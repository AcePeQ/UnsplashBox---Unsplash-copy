import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import styles from "./UserMenu.module.css";
import { useRef, useState } from "react";
import { useLogout } from "../../features/authentication/useLogout";
import { toast } from "react-toastify";

const UserMenuNav = [
  { text: "Profile", link: "/" },
  { text: "Settings", link: "/" },
];

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuTimer = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const userPhoto = useUserStore((state) => state.user?.profilePicture);
  const logoutUser = useUserStore((state) => state.logout);
  const { logout, isPending } = useLogout();

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

  function handleLogout() {
    logout(undefined, {
      onSuccess: () => {
        logoutUser();
        toast.success("Successfully logout");
        navigate("/", { replace: true });
      },
    });
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
              disabled={isPending}
              className={styles.btn}
              onClick={handleLogout}
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
