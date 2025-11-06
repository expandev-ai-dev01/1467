/**
 * @page HomePage
 * @summary Home page displaying Monster Energy product catalog
 * @domain catalog
 * @type page-component
 * @category catalog
 *
 * @routing
 * - Path: /
 * - Params: none
 * - Query: none
 * - Guards: none
 *
 * @description
 * Main landing page that displays the Monster Energy product catalog
 * with filtering and cart functionality.
 */
export const HomePage = () => {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h2 className="text-4xl font-monster text-monster-green mb-4">CATÁLOGO DE PRODUTOS</h2>
        <p className="text-gray-400 text-lg">Explore nossa linha completa de bebidas energéticas</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-monster-gray border border-monster-green rounded-lg p-6 text-center">
          <div className="w-full h-48 bg-gray-800 rounded mb-4 flex items-center justify-center">
            <span className="text-gray-600">Imagem do Produto</span>
          </div>
          <h3 className="text-xl font-bold text-monster-green mb-2">Monster Original</h3>
          <p className="text-gray-400 mb-4">A bebida energética original</p>
          <p className="text-2xl font-bold text-white mb-4">R$ 8,99</p>
          <button className="w-full bg-monster-green text-black font-bold py-2 px-4 rounded hover:bg-green-400 transition-colors">
            Adicionar ao Carrinho
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
