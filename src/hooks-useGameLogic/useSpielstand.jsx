import {useState} from 'react'

// Verwaltet den gefundenen Stapel eines einzelnen Spilers.
// Liefert außerdem die Anzahl der gefundenen Paare und ein Reset.

export function useSpielstand() {
    const [gefunden, setGefunden] = useState([]) // Array der gefundenen Karten-Objekte
    const [paare, setPaare] = useState(0) // Anzahl der gefundenen Paare
  
    function addFound(foundCards) {
        // foundCards: Array von Karten-Objekten (z. B. 2 Elemente)
        // Wir speichern pro gefundenem Paar nur einen Eintrag (ein Icon)
        // Sicherheitscheck: nichts tun, wenn das Array leer ist
        if (!Array.isArray(foundCards) || foundCards.length === 0) return

        // Wir speichern pro Paar nur eine Repräsentation (z.B. das erste Kartenobjekt)
        // und vergeben einen `pairKey`, damit wir später nicht dasselbe Paar
        // doppelt hinzufügen (z.B. wenn handleMatch aus Versehen zweimal feuert).
        const repr = foundCards[0]
        const pairKey = repr.name || repr.id

        setGefunden(prev => {
            // Prüfen, ob dieses Paar bereits vorhanden ist
            const exists = prev.some(p => p.pairKey === pairKey)
            if (exists) return prev

            // Falls neu: Zähle ein Paar hinzu und speichere das Repräsentationsobjekt
            setPaare(prevP => prevP + 1)
            return [...prev, { ...repr, pairKey }]
        })
    }

    function resetGefunden() {
        setGefunden([])
        setPaare(0)
    }
    return {gefunden, paare, addFound, resetGefunden}

}

// Was macht dieser Hook?
// Dieser Hook verwaltet den Spielstand eines einzelnen Spielers in einem Memory-Spiel.
// Er speichert die gefundenen Karten und die Anzahl der gefundenen Paare.
// Der Hook bietet Funktionen zum Hinzufügen gefundener Karten und zum Zurücksetzen des Spielstands.
// Dadurch kann die Spielkomponente den Fortschritt des Spielers verfolgen und anzeigen.
// --- IGNORE ---
