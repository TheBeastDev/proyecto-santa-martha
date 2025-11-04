import { Routes, Route } from 'react-router-dom'

// Layouts
import MainLayout from '@shared/layouts/MainLayout'

// Components
import ProtectedRoute from '@shared/components/ProtectedRoute'

// Pages
import HomePage from '@features/home/pages/HomePage'
import LoginPage from '@features/auth/pages/LoginPage'
import RegisterPage from '@features/auth/pages/RegisterPage'
import CatalogPage from '@features/products/pages/CatalogPage'
import ProductDetailPage from '@features/products/pages/ProductDetailPage'
import CartPage from '@features/cart/pages/CartPage'
import CheckoutPage from '@features/checkout/pages/CheckoutPage'

function App() {
  return (
    <Routes>
      {/* Rutas públicas con MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/producto/:id" element={<ProductDetailPage />} />
        <Route path="/carrito" element={<CartPage />} />
        
        {/* Rutas protegidas */}
        <Route 
          path="/checkout" 
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } 
        />
      </Route>
    </Routes>
  )
}

export default App
