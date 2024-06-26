import React, { useState } from 'react';
import { Table, Button, Pagination } from 'react-bootstrap';

interface DesenvolvedoresTableProps {
    currentPage: number,
    totalPages: number,
    desenvolvedores: any[];
    onEdit: (id: any, desenvolvedor: any) => void;
    onDelete: (id: any) => void;
    handlePageChange: (pageNumber: number) => void;
}

const DesenvolvedoresTable: React.FC<DesenvolvedoresTableProps> = ({ currentPage, totalPages, desenvolvedores, onEdit, onDelete, handlePageChange }) => {

    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortedDesenvolvedores, setSortedDesenvolvedores] = useState(desenvolvedores);

    const handleSort = () => {
        const sortedDesenvolvedores = [...desenvolvedores].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.nome.localeCompare(b.nome);
            } else {
                return b.nome.localeCompare(a.nome);
            }
        });
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setSortedDesenvolvedores(sortedDesenvolvedores);
    };

    return (
        <Table striped bordered hover style={{ minWidth: "60vw" }} className='text-center'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th onClick={handleSort} style={{ cursor: 'pointer' }}>Nome - {sortOrder}</th>
                    <th>Sexo</th>
                    <th>Data de Nascimento</th>
                    <th>Hobby</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {sortedDesenvolvedores.map((desenvolvedor: any) => (
                    <tr key={desenvolvedor.id}>
                        <td>{desenvolvedor.id}</td>
                        <td>{desenvolvedor.nome}</td>
                        <td>{desenvolvedor.sexo}</td>
                        <td>{desenvolvedor.data_nascimento}</td>
                        <td>{desenvolvedor.hobby}</td>
                        <td>
                            <Button variant="info" onClick={() => onEdit(desenvolvedor.id, desenvolvedor)}>Editar</Button>
                            <Button variant="danger" onClick={() => onDelete(desenvolvedor.id)}>Deletar</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={6}>
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

export default DesenvolvedoresTable;