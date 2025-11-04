import { Routes, Route } from 'react-router-dom'

// Layouts
import MainLayout from '@shared/layouts/MainLayout'

// Components
import ProtectedRoute from '@shared/components/ProtectedRoute'

// Pages
import HomePage from '@features/home/pages/HomePage'
import LoginPage from '@features/auth/pages/LoginPage'
import RegisterPage from '@features/auth/pages/RegisterPage'

// Placeholder for CheckoutPage
const CheckoutPage = () => <div className="text-center p-8"><h1 className="text-3xl font-bold">Checkout</h1></div>

function App() {
  return (
    <Routes>
      {/* Rutas públicas con MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        
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
