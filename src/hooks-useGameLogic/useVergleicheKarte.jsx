// useVergleicheKarten (für Dummies erklärt)
// -------------------------------------------------------
// Diese Datei liefert eine kleine Hilfs-Funktion, die prüft,
// ob zwei aufgedeckte Karten dasselbe Motiv haben (also ein Paar).
//
// Warum wir das als Hook/Funktion haben:
// - Die Spiel-Logik benötigt an mehreren Stellen die Frage "passen
//   diese zwei Karten zusammen?". Wir kapseln die Prüfung deshalb
//   in einer Funktion, damit der Code sauber und wiederverwendbar bleibt.
// - Wichtig: Die Prüfung selbst ist sehr einfach — sie vergleicht
//   die `name`-Eigenschaft der beiden Karten-Objekte.
//
// Hinweise für Anfänger:
// - "Vergleich doppelt?" -> Nein: Die Funktion hier macht **einen**
//   Vergleich und liefert true/false. Andere Teile des Codes (z. B.
//   der Delay-Hook) erhalten dieses Ergebnis und reagieren darauf.
// - Du kannst den Vergleich auch direkt im Hook machen, der den
//   Delay verwaltet; wir trennen ihn aber, damit die Absicht klar ist.

// Bild für gefundene Paare exportieren
// Damit die UI das Bild 'aufgedeckt.png' verwenden kann, exportieren
// wir es hier als benannten Export. So müssen Komponenten nur
// `import { AUFGEDECKT_IMG } from './useVergleicheKarte'` verwenden.
import AUFGEDECKT_IMG from '../assets/img/aufgedeckt.png'

export function useVergleicheKarten() {
  // istPaar: true wenn genau zwei Karten offen sind und die Namen gleich
  function istPaar(karten, aufgedeckt) {
    if (aufgedeckt.length === 2) {
      const a = karten[aufgedeckt[0]]
      const b = karten[aufgedeckt[1]]
      if (!a || !b) return false
      return a.name === b.name
    }
    return false
  }

  return { istPaar }
}

// Benannter Export des Bilds, damit Komponenten es direkt nutzen können.
export { AUFGEDECKT_IMG }
// Was macht dieser Hook?
// Dieser Hook bietet eine Funktion zum Vergleichen von zwei 
// aufgedeckten Karten. Die Funktion gibt true zurück, wenn die
// Karten ein Paar bilden (d.h. denselben Namen haben),
// andernfalls false. Wenn weniger als zwei Karten aufgedeckt sind,
// wird ebenfalls false zurückgegeben. Der Hook nimmt ein
// Array von Karten und ein Array von Indizes der aufgedeckten
// Karten entgegen und vergleicht die Karten basierend auf ihren 
// Namen. 
// --- IGNORE ---