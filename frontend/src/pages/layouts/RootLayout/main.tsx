import { Outlet } from 'react-router-dom';

/**
 * @layout RootLayout
 * @summary Root layout component that wraps all pages
 * @domain core
 * @type layout-component
 * @category layout
 *
 * @description
 * Provides the base structure for all pages in the application.
 * Contains header, main content area, and footer.
 */
export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-monster-gray border-b border-monster-green">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-monster text-monster-green">MONSTER ENERGY</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-monster-gray border-t border-monster-green mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-gray-400">
          <p>&copy; 2024 Monster Energy. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};
