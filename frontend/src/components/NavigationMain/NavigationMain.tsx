import { NavLink } from "react-router-dom";
import styles from "./NavigationMain.module.css";

const MAIN_NAVIGATION_LINKS = [
  { linkTitle: "Home", path: "/" },
  { linkTitle: "Collections", path: "/collections" },
];

function NavigationMain() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {MAIN_NAVIGATION_LINKS.map((link) => {
          return (
            <li key={link.linkTitle} className={styles.link_item}>
              <NavLink className={styles.link} to={link.path}>
                {link.linkTitle}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavigationMain;
