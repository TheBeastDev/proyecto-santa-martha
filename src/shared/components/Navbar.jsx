import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
// import { useCartStore } from '@store/cartStore' // Se adaptará a Redux
import { useSelector } from 'react-redux'
import { useState } from 'react'

export default function Navbar() {
  // const totalItems = useCartStore((state) => state.getTotalItems()) // Se adaptará a Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const totalItems = 0 // Placeholder

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded"></div>
            <span className="text-xl font-bold text-gray-900">
              Panadería Santa Martha
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-primary font-medium' : 'text-gray-700 hover:text-primary'
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/catalogo"
              className={({ isActive }) =>
                isActive ? 'text-primary font-medium' : 'text-gray-700 hover:text-primary'
              }
            >
              Catálogo
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? 'text-primary font-medium' : 'text-gray-700 hover:text-primary'
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contacto"
              className={({ isActive }) =>
                isActive ? 'text-primary font-medium' : 'text-gray-700 hover:text-primary'
              }
            >
              Contacto
            </NavLink>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Link
              to="/carrito"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <Link
                to={user?.role === 'ADMINISTRADOR' ? '/admin' : '/profile'}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-primary text-sm font-semibold">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <User className="w-6 h-6 text-gray-700" />
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <NavLink
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'text-primary font-medium'
                    : 'text-gray-700 hover:text-primary'
                }
              >
                Inicio
              </NavLink>
              <NavLink
                to="/catalogo"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'text-primary font-medium'
                    : 'text-gray-700 hover:text-primary'
                }
              >
                Catálogo
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'text-primary font-medium'
                    : 'text-gray-700 hover:text-primary'
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contacto"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'text-primary font-medium'
                    : 'text-gray-700 hover:text-primary'
                }
              >
                Contacto
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
