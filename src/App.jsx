// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Spielbrett from './pages/spielbrett'
import LandingPage from './pages/LandingPage'

import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/spielbrett" element={<Spielbrett />} />
    </Routes>
  )
}

export default App





