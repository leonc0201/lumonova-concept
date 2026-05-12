import { Navigate, Route, Routes } from 'react-router-dom'
import Index from '@/pages/Index'
import Product from '@/pages/Product'
import Collection from '@/pages/Collection'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/product/:id" element={<Product />} />
      {/* Legacy/Fallback: /product ohne ID → Collection */}
      <Route path="/product" element={<Navigate to="/collection" replace />} />
      <Route path="/collection" element={<Collection />} />
    </Routes>
  )
}

export default App
