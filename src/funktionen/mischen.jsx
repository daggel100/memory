// mischen (einfach erklärt)
// Diese Funktion mischt ein Array zufällig. Sie verwendet den
// Fisher‑Yates Algorithmus, der jedes Element gleich wahrscheinlich
// an jede Stelle im Array verschiebt.
//
// Wichtig: Die Funktion mischt das übergebene Array direkt und
// gibt das gemischte Array zurück.
export function mischen(array) {
    let aktuellerIndex = array.length, temporärerWert, zufälligerIndex;
    // Solange es noch Elemente zum Mischen gibt
    while (aktuellerIndex !== 0) {
        // Wähle ein verbleibendes Element
        zufälligerIndex = Math.floor(Math.random() * aktuellerIndex);
        aktuellerIndex -= 1;
        // Und tausche es mit dem aktuellen Element
        temporärerWert = array[aktuellerIndex];
        array[aktuellerIndex] = array[zufälligerIndex];
        array[zufälligerIndex] = temporärerWert;
    }

    return array;
}