import AuthButtons from "../../features/authentication/components/AuthButtons/AuthButtons";
import Logo from "../Logo/Logo";
import NavigationMain from "../NavigationMain/NavigationMain";

import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Logo />

      <NavigationMain />

      <AuthButtons />
    </header>
  );
}

export default Header;
