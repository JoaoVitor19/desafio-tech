import React from 'react';
import { Table, Button } from 'react-bootstrap';

interface DesenvolvedoresTableProps {
    desenvolvedores: any[];
    onEdit: (id: any, desenvolvedor: any) => void;
    onDelete: (id: any) => void;
}

const DesenvolvedoresTable: React.FC<DesenvolvedoresTableProps> = ({ desenvolvedores, onEdit, onDelete }) => {
    return (
        <Table striped bordered hover style={{ minWidth: "60vw" }} className='text-center'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Sexo</th>
                    <th>Data de Nascimento</th>
                    <th>Hobby</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {desenvolvedores.map((desenvolvedor: any) => (
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
        </Table>
    );
};

export default DesenvolvedoresTable;