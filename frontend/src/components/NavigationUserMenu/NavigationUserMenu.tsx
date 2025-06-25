import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogout } from "../../features/authentication/useLogout";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";

import styles from "./NavigationUserMenu.module.css";

const UserMenuNav = [
  { text: "Profile", link: "/" },
  { text: "Settings", link: "/" },
];

function NavigationUserMenu({ isMenuOpen }: { isMenuOpen: boolean }) {
  const logoutUser = useUserStore((state) => state.logout);
  const { logout, isPending } = useLogout();
  const navigate = useNavigate();

  function handleLogout() {
    logout(undefined, {
      onSuccess: () => {
        logoutUser();
        sessionStorage.removeItem("user");
        toast.success("Successfully logout");
        navigate("/", { replace: true });
      },
    });
  }

  return (
    <nav className={`${styles.nav} ${isMenuOpen ? styles.navActive : ""}`}>
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
  );
}

export default NavigationUserMenu;
