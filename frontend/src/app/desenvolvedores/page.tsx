'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import ToastMessage from '../components/ToastMessage';
import DesenvolvedorModalForm from '../components/DesenvolvedorModalForm';
import DesenvolvedoresTable from '../components/DesenvolvedoresTable';
import SearchInput from '../components/SearchInput';
import ConfirmationModal from '../components/ConfirmationModal';

const Desenvolvedores: React.FC = () => {

  const [desenvolvedor, setDesenvolvedor] = useState({
    nivel_id: '',
    nome: '',
    sexo: '',
    data_nascimento: '',
    hobby: ''
  });

  const [niveis, setNiveis] = useState([]);

  const [desenvolvedores, setDesenvolvedores] = useState([]);
  const [desenvolvedorId, setDesenvolvedorId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ show: false, variant: '', message: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const desenvolvedoresPerPage = 5;

  const [searchQuery, setSearchQuery] = useState('');

  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [desenvolvedorToDelete, setDesenvolvedorToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchDesenvolvedores(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchNiveis();
  }, []);

  const fetchNiveis = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/niveis?per_page=999`)
        .then(response => response.json())
        .then((response: any) => {
          setNiveis(response.data);
        });
    }
    catch (error: any) {
      setToast({ show: true, variant: 'danger', message: error.mensagem });
    }
  };

  const fetchDesenvolvedores = async (currentPage = 1, searchQuery = '') => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/desenvolvedores?page=${currentPage}&per_page=${desenvolvedoresPerPage}&search=${searchQuery}`);
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      setDesenvolvedores(data.data);
      setTotalPages(data.meta.last_page);
    } catch (error: any) {
      setToast({ show: true, variant: 'danger', message: error.mensagem });
    }
  };

  const addDesenvolvedor = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/desenvolvedores`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(desenvolvedor)
      });

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      fetchDesenvolvedores(currentPage);

      setDesenvolvedor({
        nivel_id: '',
        nome: '',
        sexo: '',
        data_nascimento: '',
        hobby: ''
      });

      handleCloseModal();

      setToast({ show: true, variant: 'success', message: 'Desenvolvedor adicionado com sucesso' });
    } catch (error: any) {
      setToast({ show: true, variant: 'danger', message: error.mensagem ?? 'Erro ao adicionar desenvolvedor' });
    }
  };

  const editDesenvolvedor = async (id: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/desenvolvedores/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(desenvolvedor)
      });

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      fetchDesenvolvedores(currentPage);
      handleCloseModal();
      setToast({ show: true, variant: 'success', message: 'Desenvolvedor editado com sucesso' });

    } catch (error: any) {
      setToast({ show: true, variant: 'danger', message: error.mensagem ?? 'Erro ao editar desenvolvedor' });
    }
  };

  const deleteDesenvolvedor = async (id: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/desenvolvedores/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw await response.json();
      }

      if (response.status === 404) {
        throw { message: "Desenvolvedor não encontrado" };
      }

      fetchDesenvolvedores(currentPage);
      setToast({ show: true, variant: 'success', message: 'Desenvolvedor deletado com sucesso' });
    } catch (error: any) {
      setToast({ show: true, variant: 'danger', message: error.message ?? 'Erro ao deletar desenvolvedor' });
    }
  };

  const handleOpenModal = (id: any, desenvolvedor: any) => {
    setDesenvolvedorId(id);
    setDesenvolvedor(desenvolvedor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDesenvolvedorId(null);
    setDesenvolvedor({
      nivel_id: '',
      nome: '',
      sexo: '',
      data_nascimento: '',
      hobby: ''
    });
  };

  const handleDelete = (id: number) => {
    setDesenvolvedorToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (desenvolvedorToDelete !== null) {
      deleteDesenvolvedor(desenvolvedorToDelete);
    }
    setShowConfirmModal(false);
    setDesenvolvedorToDelete(null);
  };

  const handleCloseToast = () => {
    setToast({ show: false, variant: '', message: '' });
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="d-flex w-100 justify-content-center flex-column align-items-center p-3" style={{ height: "100vh", gap: "10px" }}>
      <h1 className="mt-2 mb-2">Página de Desenvolvedores</h1>

      <Link href="/" className="mb-3 mt-3">
        Voltar para Página Inicial
      </Link>

      <div className='d-flex justify-content-between' style={{ gap: "20px", minWidth: "60vw" }}>
        <SearchInput
          placeholder='Buscar Desenvolvedores'
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={() => fetchDesenvolvedores(1, searchQuery)}
        />

        <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
          Adicionar Desenvolvedor
        </Button>
      </div>

      <div>
        <DesenvolvedoresTable
          currentPage={currentPage}
          totalPages={totalPages}
          desenvolvedores={desenvolvedores}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
          handlePageChange={handlePageChange}
        />
      </div>

      <ToastMessage
        show={toast.show}
        onClose={handleCloseToast}
        variant={toast.variant}
        message={toast.message}
      />

      <DesenvolvedorModalForm
        show={showModal}
        onHide={handleCloseModal}
        editId={desenvolvedorId}
        desenvolvedor={desenvolvedor}
        onSave={desenvolvedorId ? editDesenvolvedor : addDesenvolvedor}
        setDesenvolvedor={setDesenvolvedor}
        niveis={niveis}
      />

      <ConfirmationModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        message="Você tem certeza que deseja deletar este Desenvolvedor?"
      />

    </div>
  );
};

export default Desenvolvedores;
