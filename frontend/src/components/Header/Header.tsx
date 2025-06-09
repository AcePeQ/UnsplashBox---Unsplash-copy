import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import NavigationMain from "../NavigationMain/NavigationMain";

import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Logo />

      <NavigationMain />

      <div className={styles.buttons}>
        <Button buttonType="primary-outline" onClick={() => {}}>
          Login
        </Button>
        <Button buttonType="primary" onClick={() => {}}>
          Register
        </Button>
      </div>
    </header>
  );
}

export default Header;
