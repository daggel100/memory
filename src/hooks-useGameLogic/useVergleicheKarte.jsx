
/*
  useVergleicheKarten

  Liefert die Funktion `istPaar(karten, aufgedeckt)`.

  Erwartet:
    - karten: Array von Karten-Objekten (z. B. { id, name, img })
    - aufgedeckt: Array mit Indizes der aktuell aufgedeckten Karten

  Verhalten:
    - Wenn genau zwei Indizes in `aufgedeckt` sind, vergleicht `istPaar`
      die beiden Karten anhand ihrer `name`-Eigenschaft.
    - Gibt true zurück, wenn die Namen gleich sind (also ein Paar),
      sonst false.
    - Wenn nicht genau zwei Karten aufgedeckt sind, liefert `istPaar` false.

  Rückgabe: { istPaar } — die Funktion kann in Komponenten/anderen Hooks genutzt werden.
*/
export function useVergleicheKarten() {
  function istPaar(karten, aufgedeckt) {
    if (aufgedeckt.length === 2) {
      return karten[aufgedeckt[0]].name === karten[aufgedeckt[1]].name
    }
    return false
  }
  return { istPaar }
}
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