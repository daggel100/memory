import React from 'react'


  // Erzeugt ein Deck, indem das übergebene Karten-Array verdoppelt wird.
// Erwartet ein Array als Parameter: createDeck(kartenArray)
export function createDeck(kartenArray = []) {
  if (!Array.isArray(kartenArray) || kartenArray.length === 0) {
    console.warn('createDeck: kein kartenArray übergeben oder Array ist leer.')
    return []
  }

  // Dupliziere das kartenArray, um Paare zu erstellen
  // Füge jeder Karte eine eindeutige instanceId hinzu
  // und setze den initialen Status auf 'hidden'
    // (verdeckt)
  const base = [...kartenArray, ...kartenArray]

  return base.map((karte,index) => ({
    instanceId: `${karte.id}-${index}`,
    id: karte.id,
    name: karte.name,
    img: karte.img,
    status: 'hidden' // 'hidden', 'visible', 'found'
    }))
}

// Diese Funktion erstellt ein Deck für das Memory-Spiel.
// Sie nimmt das kartenArray, dupliziert es (für Paare),
// und fügt jedem Kartenobjekt eine eindeutige `instanceId`
// und einen `status` hinzu, der den Zustand der Karte beschreibt
// (verdeckt, aufgedeckt oder gefunden).
// --- IGNORE ---
