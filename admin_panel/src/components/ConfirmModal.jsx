import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeConfirmModal } from "../store/modal/action";

function ConfirmModal() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.modalState.confirmModalShow);
  const handleClose = () => dispatch(closeConfirmModal());

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Remove operation!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You going to remove this resource. Are you sure about that?
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
        <Button variant="danger" onClick={handleClose}>
          Yes remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
