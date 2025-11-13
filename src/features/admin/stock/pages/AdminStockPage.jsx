import { useState, useEffect } from 'react'
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { updateProduct } from '@features/products/productsSlice'

export default function AdminStockPage() {
  const products = useSelector((state) => state.products.products)
  const dispatch = useDispatch()
  const [stockValues, setStockValues] = useState({})

  useEffect(() => {
    // Initialize local state with stock values from Redux store
    const initialStock = products.reduce((acc, product) => {
      acc[product.id] = product.stock;
      return acc;
    }, {});
    setStockValues(initialStock);
  }, [products]);

  const lowStockProducts = products.filter(p => p.stock <= 10 && p.stock > 0)
  const outOfStockProducts = products.filter(p => p.stock === 0)

  const handleStockChange = (productId, newStock) => {
    setStockValues(prev => ({
      ...prev,
      [productId]: parseInt(newStock, 10)
    }));
  }

  const handleUpdateStock = (productId) => {
    const newStock = stockValues[productId];
    if (newStock !== undefined && !isNaN(newStock)) {
      dispatch(updateProduct({ id: productId, stock: newStock }));
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Stock</h1>
        <p className="text-gray-600 mt-2">
          Controla el inventario de productos
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-50 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Productos</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Stock Bajo</p>
              <p className="text-2xl font-bold text-gray-900">{lowStockProducts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-50 p-3 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sin Stock</p>
              <p className="text-2xl font-bold text-gray-900">{outOfStockProducts.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Inventario de Productos</h2>
        </div>
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
                  Stock Actual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actualizar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images?.[0] || '/cake-roll.svg'}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <p className="font-medium text-gray-900">{product.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.category?.name || 'Sin categoría'}
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={stockValues[product.id] || 0}
                      onChange={(e) => handleStockChange(product.id, e.target.value)}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      min="0"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                      product.stock > 10
                        ? 'bg-green-100 text-green-800'
                        : product.stock > 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 10
                        ? 'En stock'
                        : product.stock > 0
                        ? 'Stock bajo'
                        : 'Sin stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button 
                      onClick={() => handleUpdateStock(product.id)}
                      className="text-primary hover:text-primary-dark font-medium"
                    >
                      Actualizar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
