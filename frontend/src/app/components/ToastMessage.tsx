import React from 'react';

import { Toast, ToastContainer } from 'react-bootstrap';

const ToastMessage = ({ show, onClose, variant, message }) => {
  return (
    <ToastContainer position="bottom-center" className="p-3">
      <Toast show={show} onClose={onClose} bg={variant} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">{variant === 'success' ? 'Sucesso' : 'Erro'}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;