import { Menu, X } from "lucide-react";
import AuthButtons from "../../features/authentication/components/AuthButtons/AuthButtons";
import { useUserStore } from "../../stores/useUserStore";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import NavigationMain from "../NavigationMain/NavigationMain";
import UserMenu from "../UserMenu/UserMenu";
import styles from "./MobileHeader.module.css";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { AnimatePresence, motion } from "motion/react";

function MobileHeader() {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const isUser = useUserStore((state) => state.user);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 540px)" });

  useEffect(() => {
    function handleClick(e: Event) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const modalTarget = document.querySelector("#modals");

      if (modalTarget?.contains(target)) {
        return;
      }

      const clickedMenuButton = target.dataset.menuButton !== undefined;
      const clickedLink =
        menuRef.current?.contains(target) && target.tagName === "A";
      const clickedOutsideMenu =
        !menuRef.current || !menuRef.current.contains(target);

      if (clickedMenuButton) return;

      if ((isMenuOpen && clickedOutsideMenu) || clickedLink) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <Logo />

      <div className={styles.buttons}>
        <Button
          data-menu-button
          aria-label="button to open menu"
          onClick={() => setMenuOpen((prevStatus) => !prevStatus)}
          buttonType="primary"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </Button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            className={styles.menu}
            initial={{
              y: !isTabletOrMobile ? "calc(100% - 1px)" : "calc(75% - 1px)",
              x: "100%",
            }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <NavigationMain />

            {isUser ? <UserMenu /> : <AuthButtons />}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default MobileHeader;
