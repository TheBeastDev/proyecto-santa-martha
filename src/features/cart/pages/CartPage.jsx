import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { 
  fetchCart, // Import fetchCart async thunk
  updateCartItem, // Import updateCartItem async thunk
  removeCartItem, // Import removeCartItem async thunk
  clearCart, // Import clearCart async thunk
  selectCartItems, // Import selectCartItems selector
  selectTotalPrice, // Import selectTotalPrice selector
  selectCartStatus, // Import selectCartStatus selector
  selectCartError // Import selectCartError selector
} from '@features/cart/cartSlice'
import Button from '@shared/components/Button'

export default function CartPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const items = useSelector(selectCartItems) // Use selectCartItems selector
  const cartStatus = useSelector(selectCartStatus) // Get cart status
  const cartError = useSelector(selectCartError) // Get cart error
  const subtotal = useSelector(selectTotalPrice)

  // Fetch cart on component mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const shipping = subtotal > 0 ? 5.00 : 0
  const total = subtotal + shipping

  if (cartStatus === 'loading') {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Cargando carrito...</h2>
        </div>
      </div>
    );
  }

  if (cartStatus === 'failed') {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Error al cargar el carrito</h2>
          <p className="text-gray-600 mb-8">{cartError}</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-8">
            Agrega productos para comenzar tu pedido
          </p>
          <Link to="/catalogo">
            <Button size="lg" icon={ArrowRight}>
              Ir al catálogo
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Tu Carrito de Compras
          </h1>
          <button
            onClick={() => dispatch(clearCart())}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items del carrito */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              if (!item.product) {
                return (
                  <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex gap-6 opacity-50">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-500">Producto no disponible</h3>
                      <p className="text-sm text-gray-400">Este producto ya no existe.</p>
                    </div>
                    <button
                      onClick={() => dispatch(removeCartItem(item.id))}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                );
              }
              return (
              <div
                key={item.id} // Use item.id from backend
                className="bg-white rounded-lg shadow-md p-6 flex gap-6"
              >
                <img
                  src={item.product?.images?.[0] || '/cake-roll.svg'}
                  alt={item.product?.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.product?.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.product?.category?.name}
                      </p>
                    </div>
                    <button
                      onClick={() => dispatch(removeCartItem(item.id))} // Dispatch removeCartItem
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => dispatch(updateCartItem({ itemId: item.id, quantity: item.quantity - 1 }))} // Dispatch updateCartItem
                        className="p-2 hover:bg-gray-50 transition-colors"
                        disabled={item.quantity <= 1} // Disable if quantity is 1
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(updateCartItem({ itemId: item.id, quantity: item.quantity + 1 }))} // Dispatch updateCartItem
                        className="p-2 hover:bg-gray-50 transition-colors"
                        disabled={item.quantity >= item.product?.stock}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        ${item.product?.price?.toFixed(2)} c/u
                      </p>
                      <p className="text-xl font-bold text-primary">
                        ${(item.product?.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )})}
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Resumen del pedido
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código de descuento
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ingresa tu código"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button variant="outline" size="md">
                    Aplicar
                  </Button>
                </div>
              </div>

              <Button
                fullWidth
                size="lg"
                onClick={() => navigate('/checkout')}
              >
                Finalizar Compra
              </Button>

              <Link to="/catalogo">
                <button className="w-full mt-4 text-primary hover:text-primary-dark font-medium text-center">
                  Continuar comprando
                </button>
              </Link>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Transacción segura y encriptada
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
