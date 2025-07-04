import AuthButtons from "../../features/authentication/components/AuthButtons/AuthButtons";
import { useUserStore } from "../../stores/useUserStore";
import Logo from "../Logo/Logo";
import NavigationMain from "../NavigationMain/NavigationMain";
import UserMenu from "../UserMenu/UserMenu";
import { useMediaQuery } from "react-responsive";

import styles from "./Header.module.css";
import MobileHeader from "../MobileHeader/MobileHeader";

function Header() {
  const isUser = useUserStore((state) => state.user);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 750px)" });

  if (isTabletOrMobile) {
    return <MobileHeader />;
  }

  return (
    <header className={styles.header}>
      <Logo />

      <NavigationMain />

      {isUser ? <UserMenu /> : <AuthButtons />}
    </header>
  );
}

export default Header;
