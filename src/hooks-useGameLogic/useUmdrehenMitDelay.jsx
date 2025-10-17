
import { useEffect } from 'react'

/*
  useUmdrehenMitDelay (einfach erklärt)

  - Was macht der Hook?
    Wenn zwei Karten aufgedeckt sind und sie kein Paar sind,
    dreht er die Karten nach kurzer Zeit (hier 1 Sekunde) wieder um.

  - Wozu nützlich?
    Damit der Spieler kurz die beiden Karten sehen kann, bevor sie wieder
    verdeckt werden.

  - Wichtig:
    - istPaar muss ein Boolean (true/false) sein, also das Ergebnis
      des Vergleichs zweier Karten.
    - reset() sollte eine Funktion sein, die die offenen Karten zurücksetzt.

  - Verhalten:
    Der Hook startet einen Timer, der bei 1 Sekunde `reset()` aufruft.
    Falls sich die Abhängigkeiten ändern oder die Komponente verschwindet,
    wird der Timer abgebrochen (cleanup).
*/
export function useUmdrehenMitDelay(aufgedeckt, reset, istPaar) {
  useEffect(() => {
    if (aufgedeckt.length === 2 && !istPaar) {
      const timer = setTimeout(() => {
        reset()
      }, 1000) // 1 Sekunde
      return () => clearTimeout(timer)
    }
  }, [aufgedeckt, istPaar, reset])
}

// Der Hook überwacht das "aufgedeckt"-Array und wenn zwei Karten aufgedeckt,
// aber kein Paar sind, wird nach 1 Sekunde zurückgesetzt.
// Der Timer wird abgebrochen, wenn sich die Abhängigkeiten ändern
// oder wenn die Komponente aus dem Bildschirm entfernt wird.
// Das verhindert, dass der Timer weiterläuft, wenn der Benutzer schnell
// mehrere Karten aufdeckt oder die Seite wechselt.
// ...existing code...
