// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Spielbrett from './pages/spielbrett'

import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/spielbrett" element={<Spielbrett />} />
    </Routes>
  )
}

export default App





