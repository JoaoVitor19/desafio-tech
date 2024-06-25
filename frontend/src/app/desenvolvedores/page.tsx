import Link from 'next/link';

export default function Desenvolvedores() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Página de Desenvolvedores</h1>
      {/* Tabela de desenvolvedores */}
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Conteúdo da tabela aqui */}
      </div>
      <div className="mt-8">
        <Link href="/" className='bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-md shadow-md transition duration-300 ease-in-out'>
            Voltar para Página Inicial
        </Link>
      </div>
    </div>
  );
}