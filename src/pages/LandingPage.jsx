
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