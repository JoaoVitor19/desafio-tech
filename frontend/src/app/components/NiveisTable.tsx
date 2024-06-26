import React, { useState } from 'react';
import { Button, Table, Pagination } from 'react-bootstrap';

interface NiveisTableProps {
    niveis: any[];
    currentPage: number;
    totalPages: number;
    handleOpenModal: (id: number, nome: string) => void;
    deleteNivel: (id: number) => void;
    handlePageChange: (pageNumber: number) => void;
}

const NiveisTable: React.FC<NiveisTableProps> = ({
    niveis,
    currentPage,
    totalPages,
    handleOpenModal,
    deleteNivel,
    handlePageChange,
}) => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortedNiveis, setSortedNiveis] = useState(niveis);

    const handleSort = () => {
        const sortedNiveis = [...niveis].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.nivel.localeCompare(b.nivel);
            } else {
                return b.nivel.localeCompare(a.nivel);
            }
        });
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setSortedNiveis(sortedNiveis);
    };

    return (
        <Table striped bordered hover style={{ minWidth: "50vw" }} className='text-center'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th onClick={handleSort} style={{ cursor: 'pointer' }}>Nível - {sortOrder}</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {sortedNiveis.map((nivel) => (
                    <tr key={nivel.id}>
                        <td style={{ width: '100px' }}>{nivel.id}</td>
                        <td>{nivel.nivel}</td>
                        <td style={{ width: '200px' }}>
                            <Button variant="info" onClick={() => handleOpenModal(nivel.id, nivel.nivel)}>
                                Editar
                            </Button>
                            <Button variant="danger" onClick={() => deleteNivel(nivel.id)}>
                                Deletar
                            </Button>
                        </td>
                    </tr>
                ))}
                {/* {niveis.map((nivel: any) => (
                    <tr key={nivel.id}>
                        <td style={{ width: "100px" }}>{nivel.id}</td>
                        <td>{nivel.nivel}</td>
                        <td style={{ width: "200px" }}>
                            <Button variant="info" onClick={() => handleOpenModal(nivel.id, nivel.nivel)}>Editar</Button>
                            <Button variant="danger" onClick={() => deleteNivel(nivel.id)}>Deletar</Button>
                        </td>
                    </tr>
                ))} */}
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
    );
};

export default NiveisTable;
