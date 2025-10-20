
// LandingPage (einfach erklärt)
// - Zeigt eine kurze Startseite mit einem Button zum Starten des Spiels.
// - Beim ersten Klick wird lokal `spielGestartet` true und die Komponente
//   rendert direkt das `Spielbrett` (ohne Routing). Später kannst du hier
//   auch Formulare für Spielernamen, Einstellungen oder einen KI-Modus hinzufügen.
import { useState } from 'react'
import Spielbrett from './spielbrett'
import { useSpielerEinstellungen } from '../hooks-useGameLogic/useSpielerEinstellungen.jsx'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const [spielGestartet, setSpielGestartet] = useState(false)
  const { anzahlSpieler, setAnzahlSpieler, playerNames, setName } = useSpielerEinstellungen(2, 10)
  const navigate = useNavigate()
  const [mode, setMode] = useState('local') // 'local' | 'time' | 'computer'
  const [difficulty, setDifficulty] = useState('leicht')

  return (
    <div>
      {!spielGestartet ? (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <h1>Willkommen zum Memory!</h1>

          <div style={{ marginTop: 20 }}>
            <label>Anzahl Spieler: </label>
            <input
              name="anzahlSpieler"
              type="number"
              min={1}
              max={8}
              value={anzahlSpieler}
              onChange={(e) => setAnzahlSpieler(Number(e.target.value))}
              style={{ width: 60 }}
            />
          </div>


          <div style={{ marginTop: 20 }}>
            <h3>Spieler Namen</h3>
            {playerNames.map((n, i) => (
              <div key={i} style={{ margin: '6px 0' }}>
                <label>Spieler {i + 1}: </label>
                <input value={n} onChange={(e) => setName(i, e.target.value)} style={{ width: 160 }} />
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20 }}>
            {/* Modus-Auswahl nur sichtbar, wenn Einzelspieler */}
            {anzahlSpieler === 1 && (
              <div style={{ marginBottom: 12 }}>
                <label>Modus: </label>
                <select value={mode} onChange={(e) => setMode(e.target.value)}>
                  <option value="local">Allein (kein Wettbewerb)</option>
                  <option value="time">Gegen die Zeit</option>
                  <option value="computer">Gegen Computer</option>
                </select>
                {mode !== 'local' && (
                  <span style={{ marginLeft: 12 }}>
                    <label>Schwierigkeit: </label>
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                      <option value="superleicht">Super leicht</option>
                      <option value="leicht">Leicht</option>
                      <option value="schwer">Schwer</option>
                      <option value="extrem">Extrem</option>
                    </select>
                  </span>
                )}
              </div>
            )}

            <div>
              <button onClick={() => {
                // Wenn Computer-Modus gewählt und nur 1 Spieler, füge Computer als 2. Spieler hinzu
                if (anzahlSpieler === 1 && mode === 'computer') {
                  // Erstelle neue Namen-Array mit Computer
                  const nextNames = [...playerNames]
                  nextNames[1] = nextNames[1] || 'Computer'
                  // Start Spiel mit 2 Spielern (mensch + computer)
                  setSpielGestartet(true)
                  // Render Spielbrett mit geänderten props; Wir ersetzen hier lokal die props
                  // durch Übergabe über Zustand (vereinfachter Ansatz: render mit anzahlSpieler=2)
                  // Wir speichern die Namen zurück in den Hook
                  setName(1, nextNames[1])
                  setAnzahlSpieler(2)
                } else {
                  setSpielGestartet(true)
                }
              }}>Spiel starten</button>
            </div>

            <div style={{ marginTop: 48 }}>
              <button onClick={() => navigate('/highscores')}>Highscores anzeigen</button>
            </div>
          </div>
        </div>
        ) : (
        <Spielbrett anzahlSpieler={anzahlSpieler} playerNames={playerNames} mode={mode} difficulty={difficulty} />
      )}
    </div>
  )
}

export default LandingPage