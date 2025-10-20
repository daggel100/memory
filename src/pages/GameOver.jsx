import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ResultList from '../components/ResultList'
import { saveHighscore } from '../funktionen/highscore'

export default function GameOver() {
  const { state } = useLocation()
  const navigate = useNavigate()

  // state should contain: standings = [{ name, paare, gefunden }, ...], totalPairs
  const standings = state?.standings || []
  const totalPairs = state?.totalPairs ?? standings.reduce((s, p) => s + p.paare, 0)

  if (!state) {
    // Wenn jemand die Seite direkt öffnet, zurück zur Startseite
    navigate('/')
    return null
  }

  // Sortiere absteigend nach paare
  const sorted = [...standings].sort((a, b) => b.paare - a.paare)
  const winner = sorted[0]

  // Beim ersten Render die Ergebnisse in die Highscores schreiben
  React.useEffect(() => {
    if (sorted && sorted.length) {
      const now = new Date().toISOString()
      sorted.forEach(p => {
        saveHighscore({ name: p.name, score: p.paare, date: now })
      })
    }
  }, [])

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Spiel beendet</h1>
      <h2>{winner?.name || 'Unbekannt'} hat gewonnen mit {winner?.paare ?? 0} Paaren</h2>
      <p>Gesamt Paare: {totalPairs}</p>

      <ResultList players={sorted} />

      <div style={{ marginTop: 20 }}>
        <button onClick={() => navigate('/')}>Zurück zum Start</button>
        <button onClick={() => navigate('/highscores')} style={{ marginLeft: 8 }}>Highscores</button>
      </div>
    </div>
  )
}
