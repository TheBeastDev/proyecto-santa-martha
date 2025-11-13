import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Minus, Plus, ShoppingCart, ArrowLeft } from 'lucide-react'
import { selectProductById } from '@features/products/productsSlice'
import { addToCart } from '@features/cart/cartSlice'
import Button from '@shared/components/Button'
import ProductCard from '@shared/components/ProductCard'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const product = useSelector((state) => selectProductById(state, id))
  const allProducts = useSelector((state) => state.products.products)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Producto no encontrado
          </h2>
          <Button onClick={() => navigate('/catalogo')}>
            Volver al catálogo
          </Button>
        </div>
      </div>
    )
  }

  const images = (product.images && product.images.length > 0)
    ? product.images
    : ['/cake-roll.svg'];

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id, quantity }))
  }

  const handleBuyNow = () => {
    dispatch(addToCart({ productId: product.id, quantity }))
    navigate('/carrito')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link to="/" className="text-gray-600 hover:text-primary">
                Inicio
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link to="/catalogo" className="text-gray-600 hover:text-primary">
                Productos
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link
                to={`/catalogo?category=${product.category?.name}`}
                className="text-gray-600 hover:text-primary"
              >
                {product.category?.name || 'Categoría'}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div>
              <div className="aspect-square rounded-lg overflow-hidden mb-4">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-orange-100 text-primary text-sm font-medium rounded-full">
                  {product.category?.name || 'Sin categoría'}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-5xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div className="mb-6">
                {product.stock > 10 ? (
                  <p className="text-green-600 font-medium">
                    ✓ En stock ({product.stock} unidades disponibles)
                  </p>
                ) : product.stock > 0 ? (
                  <p className="text-yellow-600 font-medium">
                    ⚠ Últimas {product.stock} unidades
                  </p>
                ) : (
                  <p className="text-red-600 font-medium">
                    ✕ Agotado
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-50 transition-colors"
                      disabled={product.stock === 0}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="px-6 py-3 font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-3 hover:bg-gray-50 transition-colors"
                      disabled={product.stock === 0 || quantity >= product.stock}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <span className="text-gray-600">
                    Total: ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  icon={ShoppingCart}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1"
                >
                  Añadir al carrito
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="flex-1"
                >
                  Comprar ahora
                </Button>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Productos Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
