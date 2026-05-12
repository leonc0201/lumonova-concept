import { Navigate, Route, Routes } from 'react-router-dom'
import Index from '@/pages/Index'
import Product from '@/pages/Product'
import Collection from '@/pages/Collection'
import Impressum from '@/pages/Impressum'
import Datenschutz from '@/pages/Datenschutz'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/product" element={<Navigate to="/collection" replace />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/impressum" element={<Impressum />} />
      <Route path="/datenschutz" element={<Datenschutz />} />
    </Routes>
  )
}

export default App
