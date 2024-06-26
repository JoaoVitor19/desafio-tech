'use client'

import Link from 'next/link';

import { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Pagination, Table } from 'react-bootstrap';

import ToastMessage from '../components/ToastMessage';
import NivelModalForm from '../components/NivelModalForm';
import SearchInput from '../components/SearchInput';

export default function Niveis() {

  const apiUrl = "https://backend.test/niveis";

  const [nivel, setNivel] = useState('');
  const [niveis, setNiveis] = useState([]);
  const [nivelId, setNivelId] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [toast, setToast] = useState({ show: false, variant: '', message: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const niveisPerPage = 5;

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchNiveis(currentPage, searchQuery);
  }, [currentPage, searchQuery]);


  const fetchNiveis = async (currentPage = 1, searchQuery = '') => {
    try {
      await fetch(`${apiUrl}?page=${currentPage}&per_page=${niveisPerPage}&search=${searchQuery}`)
        .then(response => response.json())
        .then((response: any) => {
          setNiveis(response.data);
          setCurrentPage(response.meta.current_page);
          setTotalPages(response.meta.last_page);
        });
    }
    catch (error: any) {
      setToast({ show: true, variant: 'danger', message: error.message });
    }
  };

  const addNivel = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nivel })
      });

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      fetchNiveis(currentPage);
      setNivel('');
      handleCloseModal();
      setToast({ show: true, variant: 'success', message: 'Nível adicionado com sucesso' });

    } catch (error: any) {
      setToast({ show: true, variant: 'danger', message: error.error?.nivel ?? 'Erro ao adicionar nível' });
    }
  };

  const editNivel = async (id: any) => {
    try {

      const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nivel })
      });

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      fetchNiveis(currentPage);
      handleCloseModal();
      setToast({ show: true, variant: 'success', message: 'Nível editado com sucesso' });

    } catch (error: any) {
      setToast({ show: true, variant: 'danger', message: error.error?.nivel ?? 'Erro ao adicionar nível' });
    }
  };

  const deleteNivel = async (id: any) => {
    try {

      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw await response.json();
      }

      if (response.status == 404) {
        throw { message: "Nivel não encontrado" };
      }

      fetchNiveis(currentPage);
      setToast({ show: true, variant: 'success', message: 'Nível deletado com sucesso' });
    } catch (error: any) {
      setToast({ show: true, variant: 'danger', message: error.message ?? 'Erro ao deletar nível' });
    }
  };

  const handleOpenModal = (id: any, nome: any) => {
    setNivelId(id);
    setNivel(nome);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNivelId(null);
    setNivel('');
  };

  const handleCloseToast = () => {
    setToast({ show: false, variant: '', message: '' });
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNiveis(1, searchQuery);
  };

  return (
    <div className="d-flex w-100 justify-content-center flex-column align-items-center" style={{height: "100vh", gap: "10px"}}>

      <h1 className="mt-2 mb-2">Página de Níveis</h1>

      <Link href="/" className="mb-3 mt-3">
        Voltar para Página Inicial
      </Link>

      <div className='d-flex justify-content-between' style={{ gap: "20px", minWidth: "50vw" }}>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={() => fetchNiveis(1, searchQuery)}
        />
        <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>Adicionar Nível</Button>
      </div>


      <div>

        <Table striped bordered hover style={{ minWidth: "50vw" }} className='text-center'>
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
                <td style={{ width: "100px" }}>{nivel.id}</td>
                <td >{nivel.nivel}</td>
                <td style={{ width: "200px" }}>
                  <Button variant="info" onClick={() => handleOpenModal(nivel.id, nivel.nivel)}>Editar</Button>
                  <Button variant="danger" onClick={() => deleteNivel(nivel.id)}>Deletar</Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>
                <div className='d-flex justify-content-center'>
                  <Pagination style={{ margin: 0 }}>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
                        {i + 1}
                      </Pagination.Item>
                    ))}
                  </Pagination>
                </div>
              </td>
            </tr>
          </tfoot>
        </Table>

        <ToastMessage show={toast.show} onClose={handleCloseToast} variant={toast.variant} message={toast.message} />
        <NivelModalForm show={showModal} onHide={handleCloseModal} editId={nivelId} nivel={nivel} onSave={nivelId ? editNivel : addNivel} setNivel={setNivel} />

      </div>

    </div>
  );
}