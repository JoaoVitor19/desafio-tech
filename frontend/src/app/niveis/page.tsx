'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ListarNiveisModal from '../components/ListarNiveisModal';
import { Button, Table } from 'react-bootstrap';

export default function Niveis() {

  const apiUrl = "http://backend.test/niveis";

  const [niveis, setNiveis] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [nivel, setNivel] = useState('');

  useEffect(() => {
    fetchNiveis();
  }, []);

  const fetchNiveis = async () => {
    await fetch(apiUrl)
      .then(response => response.json())
      .then((response: any) => {
        console.log(response.data);
        setNiveis(response.data);
      }
      ).catch((error: any) => {
        console.log(error);
      });
  };

  const handleAddNivel = async () => {

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ nivel: nivel }),
    };

    await fetch(apiUrl, requestOptions)
      .then((response: any) => {
        fetchNiveis();
        setNivel('');
      }).catch(error => console.log(error));

  };

  const handleEditNivel = async (id: any) => {

    await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nivel),
    })
      .then((response: any) => {
        console.log(response);
        fetchNiveis();
        handleCloseModal();
      }
      ).catch((error: any) => {
        console.log(error);
      });

  };

  const handleDeleteNivel = async (id: any) => {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
      .then((response: any) => {
        console.log(response);
        fetchNiveis();
      }
      ).catch((error: any) => {
        console.log(error);
      });
  };

  const handleOpenModal = (id: any, nome: any) => {
    setEditId(id);
    setNivel(nome);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditId(null);
    setNivel('');
  };

  return (
    <div className="d-flex w-100 justify-content-center flex-column align-items-center">

      <h1 className="mt-2 mb-2">Página de Níveis</h1>

      <Link href="/" className="mb-3 mt-3">
        Voltar para Página Inicial
      </Link>

      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>Adicionar Nível</Button>

      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nível</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {niveis.map((nivel: any) => (
              <tr key={nivel.id}>
                <td>{nivel.id}</td>
                <td>{nivel.nivel}</td>
                <td className='gap'>
                  <Button variant="info" onClick={() => handleOpenModal(nivel.id, nivel.nivel)}>Editar</Button>
                  <Button variant="danger" onClick={() => handleDeleteNivel(nivel.id)}>Deletar</Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className='text-center'>
                <Button variant="outline-primary">Next</Button>
                <Button variant="outline-secondary">Last</Button>
              </td>
            </tr>
          </tfoot>
        </Table>

        <ListarNiveisModal show={showModal} onHide={handleCloseModal} editId={editId} nivel={nivel} onSave={editId ? handleEditNivel : handleAddNivel} setNivel={setNivel} />
      </div>

    </div>
  );
}