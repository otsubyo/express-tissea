import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Categories from './pages/Categories.jsx'
import Lines from './pages/Lines.jsx'

function App() {
  const token = localStorage.getItem('token')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={token ? <Lines /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
