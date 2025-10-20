import React from 'react'
import { loadHighscores, clearHighscores } from '../funktionen/highscore'
import { useNavigate } from 'react-router-dom'

export default function HighScores() {
  const [scores, setScores] = React.useState([])
  const navigate = useNavigate()

  React.useEffect(() => {
    setScores(loadHighscores())
  }, [])

  function handleClear() {
    if (!confirm('Highscores löschen?')) return
    clearHighscores()
    setScores([])
  }

  function handleExport() {
    const payload = JSON.stringify(scores, null, 2)
    const blob = new Blob([payload], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'memory-highscores.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Highscores</h1>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => navigate('/')}>Zurück</button>
        <button onClick={handleExport} style={{ marginLeft: 8 }}>Exportieren</button>
        <button onClick={handleClear} style={{ marginLeft: 8 }}>Löschen</button>
      </div>

      <ol>
        {scores.map((s, i) => (
          <li key={s.name + '-' + i}>
            <strong>{s.name}</strong> — {s.score} Punkte — <small>{new Date(s.date).toLocaleString()}</small>
          </li>
        ))}
      </ol>
    </div>
  )
}
