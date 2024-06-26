import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const NivelModalForm = ({ show, onHide, editId, nivel, onSave, setNivel }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(editId);
  };


  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{editId ? 'Editar Nível' : 'Adicionar Nível'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNivel">
            <Form.Label>Nível</Form.Label>
            <Form.Control className='mb-3' type="text" placeholder="Nome do Nível" value={nivel} onChange={(e) => setNivel(e.target.value)} />
          </Form.Group>
          <div className='text-center'>
            <Button variant="primary" type="submit">
              {editId ? 'Salvar' : 'Adicionar'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NivelModalForm;
