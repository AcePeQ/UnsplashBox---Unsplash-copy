import styles from "./AuthButtons.module.css";
import Button from "../../../../components/Button/Button";
import { useRef } from "react";
import Modal from "../../../../components/Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

interface IForwardAuthRef {
  open: () => void;
  close: () => void;
}

function AuthButtons() {
  const loginModal = useRef<IForwardAuthRef | null>(null);
  const registerModal = useRef<IForwardAuthRef | null>(null);

  function handleCloseLoginModal() {
    loginModal.current?.close();
  }

  function handleCloseRegisterModal() {
    registerModal.current?.close();
  }

  return (
    <div className={styles.buttons}>
      <Button
        buttonType="primary-outline"
        onClick={() => loginModal.current?.open()}
      >
        Login
      </Button>
      <Button
        buttonType="primary"
        onClick={() => registerModal.current?.open()}
      >
        Register
      </Button>

      <Modal title="Login" ref={loginModal}>
        <LoginForm onCloseModal={handleCloseLoginModal} />
      </Modal>

      <Modal title="Register" ref={registerModal}>
        <RegisterForm onCloseModal={handleCloseRegisterModal} />
      </Modal>
    </div>
  );
}

export default AuthButtons;
