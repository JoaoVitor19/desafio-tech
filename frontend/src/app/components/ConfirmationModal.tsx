import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ConfirmationModalProps {
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
    message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ show, onHide, onConfirm, message }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmação</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;
