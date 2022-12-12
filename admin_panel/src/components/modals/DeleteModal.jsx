import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeDeleteModal } from "../../store/modals/delete/action";

function DeleteModal() {
  const dispatch = useDispatch();
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const { BASE_URL } = useSelector((state) => state.globalData);
  const { show, data } = useSelector((state) => state.deleteModalData);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => dispatch(closeDeleteModal());

  const handleDelete = async () => {
    // Loading button
    setIsLoading(true);

    // Delete in server
    const url = `${BASE_URL}/${data.resourceName}/${data.id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    };
    const res = await axios.delete(url, config);

    console.log(res);
    // Hide loading button and close modal
    setIsLoading(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Remove operation!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You going to remove
        <span className="text-danger"> {data.itemName}</span>. Are you sure
        about that?
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        {isLoading ? (
          <Button variant="danger">
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </Button>
        ) : (
          <Button variant="danger" onClick={handleDelete}>
            Yes remove
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
