import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Desafio Tech</h1>
      <div className="space-y-4">
        <Link href="/desenvolvedores" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md shadow-md transition duration-300 ease-in-out">
          Ir para Página de Desenvolvedores

        </Link>
        <Link href="/niveis" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md shadow-md transition duration-300 ease-in-out">
          Ir para Página de Níveis
        </Link>
      </div>
    </div>
  );
}
