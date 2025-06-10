import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Categories.css'

function Categories() {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch('http://localhost:5000/api/categories', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP ${res.status}`)
        }
        return res.json()
      })
      .then(data => setCategories(data))
      .catch(err => {
        console.error('Erreur :', err)
        setError('Impossible de charger les catégories')
      })
  }, [])

  return (
    <div className="categories-page">
      <h2>Categories</h2>
      {error && <p className="error-message">{error}</p>}
      <ul className="categories-list">
        {Array.isArray(categories) && categories.map(cat => (
          <li key={cat._id}>
            <Link to={`/categories/${cat._id}`}>{cat.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
