import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function Home() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
      <h1 className="display-1">Desafio-Tech</h1>
      <div className='text-center mt-5 mb-3'>
        <h4>Desenvolvido por <a href="https://www.linkedin.com/in/jaovitor/" target='_blank'>João Vitor</a></h4>
      </div>
      <div className="mt-4">
        <Link href="/niveis">
          <Button variant="primary" className="me-3">Ir para Níveis</Button>
        </Link>
        <Link href="/desenvolvedores">
          <Button variant="secondary">Ir para Desenvolvedores</Button>
        </Link>
      </div>
    </div>
  );
}
