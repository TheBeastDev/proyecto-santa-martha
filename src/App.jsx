import { Routes, Route } from 'react-router-dom'

// Layouts
import MainLayout from '@shared/layouts/MainLayout'

// Pages
import HomePage from '@features/home/pages/HomePage'

function App() {
  return (
    <Routes>
      {/* Rutas públicas con MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default App
