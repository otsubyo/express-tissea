import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Categories from './pages/Categories'
import Lines from './pages/Lines'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> 
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/:id" element={<Lines />} />
    </Routes>
  )
}

export default App
