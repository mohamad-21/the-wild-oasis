import React from "react";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
function AddCabin() {
  return (
    <Modal>
      <Modal.Open openKey="cabin-form">
        <Button style={{ maxWidth: '170px' }}>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window openKey="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
