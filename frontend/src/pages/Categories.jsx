import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Categories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(setCategories)
      .catch(console.error)
  }, [])

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(cat => (
          <li key={cat._id}>
            <Link to={`/categories/${cat._id}`}>{cat.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
