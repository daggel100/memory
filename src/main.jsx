// main.jsx (einfach erklärt)
// - Hier startet die React-Anwendung. Die Datei findet das DOM-Element mit
//   der id 'root' und hängt die React-App dort an.
// - BrowserRouter sorgt für Routing (verschiedene Seiten / URLs).
// - StrictMode hilft beim Finden von Problemen während der Entwicklung.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
