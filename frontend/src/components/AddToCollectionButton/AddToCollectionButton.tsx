import { useRef } from "react";
import AddToCollectionForm from "../../features/collections/components/AddToCollectionForm/AddToCollectionForm";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import type { IImageTypes } from "../../types/imageTypes";

interface IForwardRef {
  open: () => void;
  close: () => void;
}

function AddToCollectionButton({
  buttonType,
  buttonText,
  image,
}: {
  buttonType: string;
  buttonText: string;
  image: IImageTypes;
}) {
  const addToCollectionModal = useRef<IForwardRef | null>(null);

  function handleOpenModal() {
    addToCollectionModal.current?.open();
  }

  function handleCloseModal() {
    addToCollectionModal.current?.close();
  }

  return (
    <>
      <Button onClick={handleOpenModal} buttonType={buttonType}>
        {buttonText}
      </Button>
      <Modal title="Add To Collections" ref={addToCollectionModal}>
        <AddToCollectionForm image={image} onCloseModal={handleCloseModal} />
      </Modal>
    </>
  );
}

export default AddToCollectionButton;
