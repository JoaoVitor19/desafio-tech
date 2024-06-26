import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

interface SearchInputProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, placeholder, onChange, onSubmit }) => {
  return (
    <Form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="mb-3">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button type="submit" variant="primary">Buscar</Button>
      </InputGroup>
    </Form>
  );
};

export default SearchInput;