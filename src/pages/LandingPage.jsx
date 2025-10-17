
// LandingPage (einfach erklärt)
// - Zeigt eine kurze Startseite mit einem Button zum Starten des Spiels.
// - Beim ersten Klick wird lokal `spielGestartet` true und die Komponente
//   rendert direkt das `Spielbrett` (ohne Routing). Später kannst du hier
//   auch Formulare für Spielernamen, Einstellungen oder einen KI-Modus hinzufügen.
import { useState } from 'react'
import Spielbrett from './spielbrett'

function LandingPage() {
  const [spielGestartet, setSpielGestartet] = useState(false)

  return (
    <div>
      {!spielGestartet ? (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <h1>Willkommen zum Memory!</h1>
          <button onClick={() => setSpielGestartet(true)}>
            Spiel starten
          </button>
        </div>
      ) : (
        <Spielbrett />
      )}
    </div>
  )
}

export default LandingPage