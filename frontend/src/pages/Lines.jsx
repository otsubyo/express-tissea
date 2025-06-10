import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Lines.css'

function Lines() {
  const { id } = useParams()
  const [lines, setLines] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch(`http://localhost:5000/api/categories/${id}/lines`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(setLines)
      .catch(err => setError(err.message))
  }, [id])

  return (
    <div className="lines-page">
      <h2>Lines</h2>
      {error && <p className="error-message">{error}</p>}
      <ul className="lines-list">
        {lines.map(line => (
          <li key={line._id}>{line.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Lines
