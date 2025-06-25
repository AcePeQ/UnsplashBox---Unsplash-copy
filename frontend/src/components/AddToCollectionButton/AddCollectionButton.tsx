import { Plus } from "lucide-react";
import Modal from "../Modal/Modal";
import CollectionForm from "../../features/collections/components/CollectionForm/CollectionForm";
import { useRef } from "react";

import styles from "./AddCollectionButton.module.css";

interface IForwardAuthRef {
  open: () => void;
  close: () => void;
}

function AddCollectionButton() {
  const addCollectionModal = useRef<IForwardAuthRef | null>(null);

  function handleOpenModal() {
    addCollectionModal.current?.open();
  }

  function handleCloseModal() {
    addCollectionModal.current?.close();
  }

  return (
    <>
      <button
        onClick={handleOpenModal}
        className={`${styles.btn} ${styles.big}`}
      >
        <Plus aria-disabled className={styles.icon} />
        Add new collection
      </button>
      <Modal title="Add Collection" ref={addCollectionModal}>
        <CollectionForm onCloseModal={handleCloseModal} />
      </Modal>
    </>
  );
}

export default AddCollectionButton;
