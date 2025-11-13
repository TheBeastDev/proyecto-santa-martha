import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom'
import { fetchUserProfile, selectIsAuthenticated, selectAuthUser } from '@features/auth/authSlice';

// Layouts
import MainLayout from '@shared/layouts/MainLayout'
import AdminLayout from '@shared/layouts/AdminLayout'

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
import AboutPage from '@features/about/pages/AboutPage'
import ContactPage from '@features/contact/pages/ContactPage'
import UserOrdersPage from '@features/orders/pages/UserOrdersPage'

// Admin Pages
import DashboardPage from '@features/admin/dashboard/pages/DashboardPage'
import AdminProductsPage from '@features/admin/products/pages/AdminProductsPage'
import AdminOrdersPage from '@features/admin/orders/pages/AdminOrdersPage'
import AdminUsersPage from '@features/admin/users/pages/AdminUsersPage'
import AdminStockPage from '@features/admin/stock/pages/AdminStockPage'
import AdminOrderDetailPage from '@features/admin/orders/pages/AdminOrderDetailPage'
import AdminNotificationsPage from '@features/notifications/pages/AdminNotificationsPage'
import ProfilePage from '@features/auth/pages/ProfilePage'

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, user, dispatch]);

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
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        
        <Route 
          path="/checkout" 
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/mis-pedidos" 
          element={
            <ProtectedRoute>
              <UserOrdersPage />
            </ProtectedRoute>
          } 
        />
      </Route>

      {/* Rutas de administrador */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="productos" element={<AdminProductsPage />} />
        <Route path="pedidos" element={<AdminOrdersPage />} />
        <Route path="pedidos/:id" element={<AdminOrderDetailPage />} />
        <Route path="usuarios" element={<AdminUsersPage />} />
        <Route path="stock" element={<AdminStockPage />} />
        <Route path="notificaciones" element={<AdminNotificationsPage />} />
      </Route>

      {/* Ruta 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
