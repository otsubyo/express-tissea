import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css' 

function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      if (!res.ok) throw new Error('Signup failed')
      navigate('/login')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Créer un compte</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  )
}

export default Signup
