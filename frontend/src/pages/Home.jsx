import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch('http://localhost:5000/api/categories', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject('Erreur serveur'))
      .then(setCategories)
      .catch(() => setError('Erreur de chargement des catégories'))
  }, [])

  return (
    <div className="home-page">
      <div className="top-buttons">
        <button onClick={() => navigate('/login')}>Connexion</button>
        <button onClick={() => navigate('/signup')}>Inscription</button>
      </div>

      <h1>Bienvenue sur Tisséa</h1>
      <h2>Catégories de transport</h2>
      {error && <p className="error-message">{error}</p>}
      <ul className="categories-list">
        {categories.map(cat => (
          <li key={cat._id}>
            <Link to={`/categories/${cat._id}`}>{cat.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
