import React from "react";
import { Button, Modal } from "react-bootstrap";

interface Props {
  title: string;
  children: React.ReactNode;
  onSave: () => void;
  onClose: () => void;
}

const ModalDialog = ({ onSave, onClose, title, children }: Props) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDialog;
