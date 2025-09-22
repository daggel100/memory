// Funktion zum Mischen eines Arrays (Karten)

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