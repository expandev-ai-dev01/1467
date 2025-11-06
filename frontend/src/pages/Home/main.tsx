import { useState } from 'react';
import { useProductList, useProductDetail, useProductSearch } from '@/domain/product/hooks';
import {
  ProductGrid,
  Pagination,
  ProductModal,
  SearchBar,
  SearchResults,
} from '@/domain/product/components';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';

/**
 * @page HomePage
 * @summary Home page displaying Monster Energy product catalog with search
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
 * with text search, pagination, and product detail modal.
 */
export const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const { data, isLoading, error, refetch } = useProductList({
    params: { page: currentPage, pageSize: 16 },
  });

  const {
    searchTerm,
    debouncedSearchTerm,
    filteredProducts,
    searchHistory,
    showSuggestions,
    handleSearchChange,
    clearSearch,
    selectSuggestion,
    toggleSuggestions,
    totalResults,
  } = useProductSearch({
    products: data?.products || [],
  });

  const {
    data: productDetail,
    isLoading: isLoadingDetail,
    error: detailError,
  } = useProductDetail({
    productId: selectedProductId,
    enabled: selectedProductId !== null,
  });

  const handleProductClick = (productId: number) => {
    setSelectedProductId(productId);
  };

  const handleCloseModal = () => {
    setSelectedProductId(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return (
      <ErrorMessage
        title="Erro ao carregar produtos"
        message="Não foi possível carregar o catálogo de produtos. Por favor, tente novamente."
        onRetry={refetch}
      />
    );
  }

  const isSearching = debouncedSearchTerm.length >= 3;
  const displayProducts = isSearching ? filteredProducts : data?.products || [];

  return (
    <div className="space-y-8">
      <section className="text-center space-y-6">
        <div>
          <h2 className="text-4xl font-monster text-monster-green mb-4">CATÁLOGO DE PRODUTOS</h2>
          <p className="text-gray-400 text-lg">
            Explore nossa linha completa de bebidas energéticas
          </p>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          searchHistory={searchHistory}
          showSuggestions={showSuggestions}
          onSearchChange={handleSearchChange}
          onClear={clearSearch}
          onSelectSuggestion={selectSuggestion}
          onToggleSuggestions={toggleSuggestions}
        />
      </section>

      <SearchResults
        totalResults={isSearching ? totalResults : data?.totalProducts || 0}
        searchTerm={debouncedSearchTerm}
        isSearching={isSearching}
      />

      {isLoading ? (
        <LoadingSpinner size="lg" />
      ) : (
        <>
          <ProductGrid
            products={displayProducts}
            onProductClick={handleProductClick}
            isLoading={isLoading}
          />

          {!isSearching && data && data.totalPages > 1 && (
            <Pagination
              currentPage={data.currentPage}
              totalPages={data.totalPages}
              onPageChange={handlePageChange}
              hasNext={data.hasNext}
              hasPrevious={data.hasPrevious}
            />
          )}
        </>
      )}

      {selectedProductId !== null && (
        <>
          {isLoadingDetail ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
              <LoadingSpinner size="lg" />
            </div>
          ) : detailError ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
              <div className="bg-monster-gray border border-red-600 rounded-lg p-6 max-w-md">
                <h3 className="text-xl font-bold text-red-400 mb-2">Erro ao carregar detalhes</h3>
                <p className="text-gray-300 mb-4">
                  Não foi possível carregar os detalhes do produto.
                </p>
                <button
                  onClick={handleCloseModal}
                  className="w-full bg-monster-green text-black font-bold py-2 px-4 rounded hover:bg-green-400 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          ) : (
            <ProductModal
              product={productDetail || null}
              isOpen={selectedProductId !== null}
              onClose={handleCloseModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
