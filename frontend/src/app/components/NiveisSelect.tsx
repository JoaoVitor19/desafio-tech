import React from 'react';
import { Form } from 'react-bootstrap';

interface NivelOption {
    id: number;
    nivel: string;
}

interface NiveisSelectProps {
    niveis: NivelOption[];
    nivelId: number | null;
    onChange: (id: number) => void;
}

const NiveisSelect: React.FC<NiveisSelectProps> = ({ niveis, nivelId, onChange }) => {

    const handleChange = (event: React.ChangeEvent<any>) => {
        onChange(parseInt(event.target.value));
    };

    return (
        <Form.Group className="mb-3" controlId="formNivel">
            <Form.Label>Nível</Form.Label>
            <Form.Control as="select" value={nivelId ?? ''} onChange={handleChange}>
                {niveis.map((nivel) => (
                    <option key={nivel.id} value={nivel.id}>{nivel.nivel}</option>
                ))}
            </Form.Control>
        </Form.Group>
    );
};

export default NiveisSelect;