import { X } from "lucide-react";
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  type ReactElement,
} from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

interface IModal {
  title: string;
  children: ReactElement;
}

const Modal = forwardRef(function Modal({ title, children }: IModal, ref) {
  const [contentRender, setContentRender] = useState(false);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        if (modalRef.current) {
          modalRef.current.showModal();
          setContentRender(true);
        }
      },

      close() {
        if (modalRef.current) {
          modalRef.current.close();
        }
      },
    };
  });

  return createPortal(
    <dialog
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      className={styles.dialog}
      onClose={() => {
        setTimeout(() => {
          setContentRender(false);
        }, 300);
      }}
    >
      <div
        id="modal"
        onClick={(e) => e.stopPropagation()}
        className={styles.modal}
      >
        <div className={styles.header}>
          <h2>{title}</h2>
          <button onClick={() => modalRef.current?.close()} aria-label="close">
            <X size={36} />
          </button>
        </div>
        {contentRender ? children : null}
      </div>
    </dialog>,
    document.getElementById("modals") as HTMLElement
  );
});

export default Modal;
