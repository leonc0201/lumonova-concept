import { Route, Routes } from 'react-router-dom'
import Index from '@/pages/Index'
import Product from '@/pages/Product'
import Collection from '@/pages/Collection'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/product" element={<Product />} />
      <Route path="/collection" element={<Collection />} />
    </Routes>
  )
}

export default App
