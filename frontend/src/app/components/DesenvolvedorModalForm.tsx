import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import NiveisSelect from './NiveisSelect';

const DesenvolvedorModalForm = ({ show, onHide, editId, desenvolvedor, onSave, setDesenvolvedor, niveis }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(editId);
  };

  const [formValid, setFormValid] = useState(false)

  const isFormValid = () => {
    return (
      desenvolvedor.nome &&
      desenvolvedor.sexo &&
      desenvolvedor.data_nascimento &&
      desenvolvedor.hobby &&
      desenvolvedor.nivel_id
    );
  };

  useEffect(() => {
    setFormValid(isFormValid());
  }, [desenvolvedor]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{editId ? 'Editar Desenvolvedor' : 'Adicionar Desenvolvedor'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome do Desenvolvedor"
              value={desenvolvedor.nome}
              onChange={(e) => setDesenvolvedor({ ...desenvolvedor, nome: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSexo">
            <Form.Label>Sexo</Form.Label>
            <Form.Control
              as="select"
              value={desenvolvedor.sexo}
              onChange={(e) => setDesenvolvedor({ ...desenvolvedor, sexo: e.target.value })}
            >
              <option value="">Selecione uma opção</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDataNascimento">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control
              type="date"
              value={desenvolvedor.data_nascimento}
              onChange={(e) => setDesenvolvedor({ ...desenvolvedor, data_nascimento: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formHobby">
            <Form.Label>Hobby</Form.Label>
            <Form.Control
              type="text"
              placeholder="Hobby"
              value={desenvolvedor.hobby}
              onChange={(e) => setDesenvolvedor({ ...desenvolvedor, hobby: e.target.value })}
            />
            <NiveisSelect
              niveis={niveis}
              nivelId={desenvolvedor.nivel_id ?? desenvolvedor.nivel?.id}
              onChange={(id: number) => setDesenvolvedor({ ...desenvolvedor, nivel_id: id })}
            />
          </Form.Group>
          <div className='text-center'>
            <Button variant="primary" type="submit" disabled={!formValid}>
              {editId ? 'Salvar Alterações' : 'Adicionar'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DesenvolvedorModalForm;
