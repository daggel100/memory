// App.jsx (einfach erklärt)
// - Diese Komponente definiert die Haupt-Routen der Anwendung.
// - Für '/' (Start) zeigen wir die LandingPage, für '/spielbrett' das Spielbrett.
// - Die eigentliche Darstellung und Logik sind in den einzelnen Seiten-Komponenten.
// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Spielbrett from './pages/spielbrett'
import LandingPage from './pages/LandingPage'
import GameOver from './pages/GameOver'
import HighScores from './pages/HighScores'

import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
  <Route path="/spielbrett" element={<Spielbrett />} />
  <Route path="/gameover" element={<GameOver />} />
  <Route path="/highscores" element={<HighScores />} />
    </Routes>
  )
}

export default App





