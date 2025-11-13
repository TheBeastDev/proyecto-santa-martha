import { useState, useEffect, useMemo } from 'react'
import { Plus, Edit, Search, AlertCircle, X, Archive, ArchiveRestore, ArchiveX } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@shared/components/Button'
import ProductModal from '../components/ProductModal'
import CategoryModal from '../components/CategoryModal'
import ArchivedProductsModal from '../components/ArchivedProductsModal'
import { fetchProducts, createProduct, updateProduct, archiveProduct, selectProductsError, clearProductsError } from '@features/products/productsSlice'
import { fetchCategories, selectCategories, createCategory } from '@features/categories/categoriesSlice'

export default function AdminProductsPage() {
  const products = useSelector((state) => state.products.products)
  const error = useSelector(selectProductsError)
  const categories = useSelector(selectCategories)
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isArchivedModalOpen, setIsArchivedModalOpen] = useState(false)
  const [alertError, setAlertError] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch])

  useEffect(() => {
    if (error) {
      setAlertError(error);
      dispatch(clearProductsError()); 
    }
  }, [error, dispatch]);

  const { activeProducts, archivedProducts } = useMemo(() => {
    const active = [];
    const archived = [];
    products.forEach(p => {
      if (p.isArchived) {
        archived.push(p);
      } else {
        active.push(p);
      }
    });
    return { activeProducts: active, archivedProducts: archived };
  }, [products]);

  const filteredProducts = activeProducts.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleArchive = (productId) => {
    if (confirm('¿Estás seguro de archivar este producto?')) {
      dispatch(archiveProduct({ productId, archive: true }))
    }
  }

  const handleRestore = (productId) => {
    dispatch(archiveProduct({ productId, archive: false }));
  }

  const handleSave = (productData) => {
    if (selectedProduct) {
      dispatch(updateProduct({ ...productData, id: selectedProduct.id }))
    } else {
      dispatch(createProduct(productData))
    }
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const handleSaveCategory = (categoryData) => {
    dispatch(createCategory(categoryData))
    setIsCategoryModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {alertError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg flex justify-between items-center" role="alert">
          <div className="flex items-center">
            <AlertCircle className="w-6 h-6 mr-3" />
            <div>
              <p className="font-bold">Error</p>
              <p>{alertError}</p>
            </div>
          </div>
          <button onClick={() => setAlertError(null)} className="p-1 rounded-full hover:bg-red-200">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
          <p className="text-gray-600 mt-2">
            Gestiona el catálogo de productos activos.
          </p>
        </div>
        <div className="flex gap-4">
          <Button icon={ArchiveX} variant="outline" onClick={() => setIsArchivedModalOpen(true)}>
            Ver Archivados ({archivedProducts.length})
          </Button>
          <Button icon={Plus} onClick={() => setIsCategoryModalOpen(true)}>
            Añadir Categoría
          </Button>
          <Button icon={Plus} onClick={() => {
            setSelectedProduct(null)
            setIsModalOpen(true)
          }}>
            Añadir Producto
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar productos activos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images?.[0] || '/cake-roll.svg'}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.category?.name || 'Sin categoría'}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                      product.stock > 10
                        ? 'bg-green-100 text-green-800'
                        : product.stock > 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock} unidades
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                        onClick={() => {
                          setSelectedProduct(product)
                          setIsModalOpen(true)
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleArchive(product.id)}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Archivar"
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal
          product={selectedProduct}
          categories={categories}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedProduct(null)
          }}
          onSave={handleSave}
        />
      )}

      {isCategoryModalOpen && (
        <CategoryModal
          onClose={() => setIsCategoryModalOpen(false)}
          onSave={handleSaveCategory}
        />
      )}

      <ArchivedProductsModal
        isOpen={isArchivedModalOpen}
        onClose={() => setIsArchivedModalOpen(false)}
        products={archivedProducts}
        onRestore={handleRestore}
      />
    </div>
  )
}
