
import { useState } from 'react'

/*
  useAufgedeckteKarten (einfach erklärt)

  - Was macht der Hook?
    Er merkt sich, welche Karten gerade aufgedeckt sind (als Indizes).

  - Wozu nützlich?
    Damit die UI weiß, welche Karten das Bild zeigen und welche die Rückseite.

  - Funktionen:
    - karteUmdrehen(index): legt einen Index in das Array, wenn noch
      weniger als zwei Karten offen sind und die Karte noch nicht offen ist.
    - reset(): macht alle Karten wieder zu (leert das Array).

  - Rückgabe:
    { aufgedeckt, karteUmdrehen, reset }
*/
export function useAufgedeckteKarten() {
  const [aufgedeckt, setAufgedeckt] = useState([])

  function karteUmdrehen(index) {
    if (aufgedeckt.length < 2 && !aufgedeckt.includes(index)) {
      setAufgedeckt([...aufgedeckt, index])
    }
  }

  function reset() {
    setAufgedeckt([])
  }

  return { aufgedeckt, karteUmdrehen, reset }
}

// Was macht dieser Hook?
// Dieser Hook verwaltet den Zustand der aufgedeckten Karten in 
// einem Memory-Spiel. Er bietet Funktionen zum Umdrehen
// und Zurücksetzen der aufgedeckten Karten.
// Er stellt sicher, dass maximal zwei Karten gleichzeitig 
// aufgedeckt werden können. Wenn eine Karte bereits
// aufgedeckt ist, kann sie nicht erneut umgedreht werden.
// Der Hook gibt das Array der aufgedeckten Karten,
// eine Funktion zum Umdrehen einer Karte und eine Funktion zum 
// Zurücksetzen zurück.
// --- IGNORE ---