import { useNavigate } from 'react-router-dom';

/**
 * @page NotFoundPage
 * @summary 404 error page for non-existent routes
 * @domain core
 * @type error-page
 * @category navigation
 *
 * @routing
 * - Path: *
 * - Params: none
 * - Query: none
 * - Guards: none
 */
export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-monster text-monster-green mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-4">Página Não Encontrada</h2>
      <p className="text-gray-400 mb-8">A página que você está procurando não existe.</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-monster-green text-black font-bold rounded hover:bg-green-400 transition-colors"
      >
        Voltar para Home
      </button>
    </div>
  );
};

export default NotFoundPage;
