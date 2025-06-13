import styles from "./AuthButtons.module.css";
import Button from "../../../../components/Button/Button";
import { useRef } from "react";
import Modal from "../../../../components/Modal/Modal";

interface IForwardAuthRef {
  open: () => void;
  close: () => void;
}

function AuthButtons() {
  const loginModal = useRef<IForwardAuthRef | null>(null);
  const registerModal = useRef<IForwardAuthRef | null>(null);

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
        <p>Login</p>
      </Modal>

      <Modal title="Register" ref={registerModal}>
        <p>Register</p>
      </Modal>
    </div>
  );
}

export default AuthButtons;
