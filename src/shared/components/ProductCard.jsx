import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
// import { useCartStore } from '@store/cartStore' // Se adaptará a Redux
import Button from './Button'

export default function ProductCard({ product }) {
  // const addItem = useCartStore((state) => state.addItem) // Se adaptará a Redux

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // addItem(product, 1) // Se adaptará a Redux
    console.log('Añadir al carrito (lógica pendiente)', product.name)
  }

  return (
    <Link to={`/producto/${product.id}`} className="card group hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Últimas unidades
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Agotado
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-10 h-10 bg-primary hover:bg-primary-dark text-white rounded-full flex items-center justify-center transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  )
}
