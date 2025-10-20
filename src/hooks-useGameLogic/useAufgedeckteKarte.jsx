
import { useState, useRef, useEffect } from 'react'

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
  // Ref, damit zeitverzögerte Aufrufe (z.B. setTimeout in der KI) die
  // aktuelle Anzahl an aufgedeckten Karten sehen können.
  const aufgedecktRef = useRef(aufgedeckt)
  useEffect(() => { aufgedecktRef.current = aufgedeckt }, [aufgedeckt])

  // Gibt true zurück, wenn das Umdrehen erfolgreich war, sonst false.
  function karteUmdrehen(index) {
    // Nutze das Ref, um den aktuellsten Wert auch innerhalb von Zeitverzögerungen zu prüfen.
    const current = aufgedecktRef.current
    if (current.length < 2 && !current.includes(index)) {
      setAufgedeckt(prev => {
        const next = [...prev, index]
        // Sofort im Ref aktualisieren, damit parallel laufende Timer das sehen
        aufgedecktRef.current = next
        return next
      })
      return true
    }
    return false
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