'use client'

import Link from 'next/link';

import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import ToastMessage from '../components/ToastMessage';
import NivelModalForm from '../components/NivelModalForm';
import SearchInput from '../components/SearchInput';
import NiveisTable from '../components/NiveisTable';
import ConfirmationModal from '../components/ConfirmationModal';

export default function Niveis() {

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/niveis`;

  const [nivel, setNivel] = useState('');
  const [niveis, setNiveis] = useState([]);
  const [nivelId, setNivelId] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [toast, setToast] = useState({ show: false, variant: '', message: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const niveisPerPage = 5;

  const [searchQuery, setSearchQuery] = useState('');

  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [nivelToDelete, setNivelToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchNiveis(currentPage);
  }, [currentPage]);

  const fetchNiveis = async (currentPage = 1, searchQuery = '') => {
    try {
      await fetch(`http://localhost:8000/niveis?page=${currentPage}&per_page=${niveisPerPage}&search=${searchQuery}`)
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
      setToast({ show: true, variant: 'danger', message: error.mensagem ?? 'Erro ao adicionar nível' });
    }
  };

  const editNivel = async (id: any) => {
    try {

      const response = await fetch(`http://localhost:8000/niveis/${id}`, {
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

      const response = await fetch(`http://localhost:8000/niveis/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw await response.json();
      }

      if (response.status == 404) {
        throw { message: "Nível não encontrado" };
      }

      fetchNiveis(currentPage);
      setToast({ show: true, variant: 'success', message: 'Nível deletado com sucesso' });
    } catch (error: any) {
      setToast({ show: true, variant: 'danger', message: error.message ?? 'Erro ao deletar nível' });
    }
  };

  const handleDelete = (id: number) => {
    setNivelToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (nivelToDelete !== null) {
      deleteNivel(nivelToDelete);
    }
    setShowConfirmModal(false);
    setNivelToDelete(null);
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

  return (
    <div className="d-flex w-100 justify-content-center flex-column align-items-center" style={{ height: "100vh", gap: "10px" }}>

      <h1 className="mt-2 mb-2">Página de Níveis</h1>

      <Link href="/" className="mb-3 mt-3">
        Voltar para Página Inicial
      </Link>

      <div className='d-flex justify-content-between' style={{ gap: "20px", minWidth: "50vw" }}>
        <SearchInput
          value={searchQuery}
          placeholder='Buscar Niveis'
          onChange={setSearchQuery}
          onSubmit={() => fetchNiveis(1, searchQuery)}
        />
        <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>Adicionar Nível</Button>
      </div>

      <div>
        <NiveisTable
          niveis={niveis}
          currentPage={currentPage}
          totalPages={totalPages}
          handleOpenModal={handleOpenModal}
          deleteNivel={handleDelete}
          handlePageChange={handlePageChange}
        />
      </div>

      <ToastMessage show={toast.show} onClose={handleCloseToast} variant={toast.variant} message={toast.message} />
      <NivelModalForm show={showModal} onHide={handleCloseModal} editId={nivelId} nivel={nivel} onSave={nivelId ? editNivel : addNivel} setNivel={setNivel} />

      <ConfirmationModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        message="Você tem certeza que deseja deletar este nível?"
      />

    </div>
  );
}