import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Search, SlidersHorizontal, Wheat, Cookie, Cake } from 'lucide-react'
import { 
  setSelectedCategory, 
  setSearchQuery, 
  setSortBy, 
  fetchProducts,
  selectProducts,
  selectProductsStatus, 
  selectProductsError 
} from '@features/products/productsSlice'
import { 
  fetchCategories, 
  selectCategories, 
  selectCategoriesStatus, 
  selectCategoriesError 
} from '@features/categories/categoriesSlice'
import ProductCard from '@shared/components/ProductCard'
import Button from '@shared/components/Button'

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  
  const dispatch = useDispatch()
  const { selectedCategory, searchQuery, sortBy } = useSelector((state) => state.products)
  const categories = useSelector(selectCategories)
  const categoriesStatus = useSelector(selectCategoriesStatus)
  const categoriesError = useSelector(selectCategoriesError)
  const products = useSelector(selectProducts) || [] // Get products from store
  const productsStatus = useSelector(selectProductsStatus) // Get products status
  const productsError = useSelector(selectProductsError) // Get products error

  // Fetch categories on component mount
  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories());
    }
  }, [categoriesStatus, dispatch]);

  // Fetch products whenever filters or sort order change
  useEffect(() => {
    dispatch(fetchProducts({
      categoryId: selectedCategory,
      searchQuery,
      sortBy,
    }));
  }, [selectedCategory, searchQuery, sortBy, dispatch]);

  const handleCategoryChange = (category) => {
    if (category === selectedCategory) {
      dispatch(setSelectedCategory(null))
      searchParams.delete('category')
    } else {
      dispatch(setSelectedCategory(category.id)) // Use category.id from backend
      searchParams.set('category', category.id)
    }
    setSearchParams(searchParams)
  }

  const categoryIcons = {
    'Pan': Wheat,
    'Facturas': Cookie,
    'Tortas': Cake
  }

  let content;

  if (productsStatus === 'loading') {
    content = <div className="text-center py-12">Cargando productos...</div>;
  } else if (productsStatus === 'failed') {
    content = <div className="text-center py-12 text-red-500">Error: {productsError}</div>;
  } else if (products.length > 0) {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  } else {
    content = (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <Search className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No se encontraron productos
        </h3>
        <p className="text-gray-600 mb-4">
          Intenta ajustar tus filtros o búsqueda
        </p>
        <Button
          variant="outline"
          onClick={() => {
            dispatch(setSelectedCategory(null))
            dispatch(setSearchQuery(''))
            searchParams.delete('category')
            setSearchParams(searchParams)
          }}
        >
          Limpiar filtros
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Catálogo</h1>
          <p className="text-gray-600">
            Explora nuestra selección de productos artesanales
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filtros */}
          <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                Filtros
              </h2>

              {/* Buscar */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar productos
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Categorías */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Categorías
                </h3>
                <div className="space-y-2">
                  {categories.filter(c => c && c.id && c.name).map((category) => {
                    const Icon = categoryIcons[category.name] || Wheat // Use category.name
                    return (
                      <button
                        key={category.id} // Use category.id
                        onClick={() => handleCategoryChange(category)}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.id // Compare with category.id
                            ? 'bg-orange-50 text-primary font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {category.name}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Ordenar por */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Ordenar por
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => dispatch(setSortBy(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="popularity">Popularidad</option>
                  <option value="price-asc">Precio: Ascendente</option>
                  <option value="price-desc">Precio: Descendente</option>
                  <option value="name">Nombre</option>
                </select>
              </div>

              {/* Botón limpiar filtros */}
              {(selectedCategory || searchQuery) && (
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    dispatch(setSelectedCategory(null))
                    dispatch(setSearchQuery(''))
                    searchParams.delete('category')
                    setSearchParams(searchParams)
                  }}
                >
                  Limpiar filtros
                </Button>
              )}
            </div>
          </aside>

          {/* Productos */}
          <div className="flex-1">
            {/* Mobile filter toggle */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                fullWidth
                icon={SlidersHorizontal}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Ocultar' : 'Mostrar'} Filtros
              </Button>
            </div>

            {/* Resultados */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                {products.length} producto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Grid de productos */}
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}
