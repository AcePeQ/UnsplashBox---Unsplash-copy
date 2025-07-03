import AuthButtons from "../../features/authentication/components/AuthButtons/AuthButtons";
import { useUserStore } from "../../stores/useUserStore";
import Logo from "../Logo/Logo";
import NavigationMain from "../NavigationMain/NavigationMain";
import UserMenu from "../UserMenu/UserMenu";
import styles from "./MobileHeader.module.css";

function MobileHeader() {
  const isUser = useUserStore((state) => state.user);

  return (
    <header className={styles.header}>
      <Logo />

      {isUser ? <UserMenu /> : <AuthButtons />}

      {/* <NavigationMain /> */}
    </header>
  );
}

export default MobileHeader;
