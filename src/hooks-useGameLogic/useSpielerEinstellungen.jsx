import { useState, useEffect } from 'react'

// useSpielerEinstellungen verwaltet Spieleranzahl, Spielernamen und Anzahl Paare.
// Werte werden im localStorage gehalten, damit Einstellungen beim Reload erhalten bleiben.
export function useSpielerEinstellungen(defaultAnzahl = 2, defaultPaare = 10) {
  const [anzahlSpieler, setAnzahlSpieler] = useState(() => {
    try {
      const raw = localStorage.getItem('anzahlSpieler')
      return raw ? Number(raw) : defaultAnzahl
    } catch (e) {
      return defaultAnzahl
    }
  })

  const [anzahlPaare, setAnzahlPaare] = useState(() => {
    try {
      const raw = localStorage.getItem('anzahlPaare')
      return raw ? Number(raw) : defaultPaare
    } catch (e) {
      return defaultPaare
    }
  })

  const [playerNames, setPlayerNames] = useState(() => {
    try {
      const raw = localStorage.getItem('playerNames')
      if (raw) return JSON.parse(raw)
      // default names
      return Array.from({ length: defaultAnzahl }, (_, i) => `Spieler ${i + 1}`)
    } catch (e) {
      return Array.from({ length: defaultAnzahl }, (_, i) => `Spieler ${i + 1}`)
    }
  })

  useEffect(() => {
    try { localStorage.setItem('anzahlSpieler', String(anzahlSpieler)) } catch (e) {}
  }, [anzahlSpieler])

  useEffect(() => {
    try { localStorage.setItem('anzahlPaare', String(anzahlPaare)) } catch (e) {}
  }, [anzahlPaare])

  useEffect(() => {
    try { localStorage.setItem('playerNames', JSON.stringify(playerNames)) } catch (e) {}
  }, [playerNames])

  // Hilfsfunktion: setze Namen-Liste auf die aktuelle Anzahl von Spielern
  function ensureNamesLength(count) {
    setPlayerNames(prev => {
      const copy = prev.slice(0, count)
      while (copy.length < count) copy.push(`Spieler ${copy.length + 1}`)
      return copy
    })
  }

  // Wenn die Anzahl Spieler sich ändert, passen wir die Namenliste an
  useEffect(() => {
    ensureNamesLength(anzahlSpieler)
  }, [anzahlSpieler])

  function setName(index, name) {
    setPlayerNames(prev => prev.map((p, i) => (i === index ? name : p)))
  }

  return {
    anzahlSpieler,
    setAnzahlSpieler,
    anzahlPaare,
    setAnzahlPaare,
    playerNames,
    setName,
  }
}
