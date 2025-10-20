import { useState, useEffect } from 'react'

// useAnzahlSpieler: einfacher Hook, um die Anzahl der Spieler zu verwalten.
// Er speichert die Anzahl im localStorage, damit sie zwischen Reloads erhalten bleibt.
export function useAnzahlSpieler(initial = 2) {
  const [anzahl, setAnzahl] = useState(() => {
    try {
      const raw = localStorage.getItem('anzahlSpieler')
      return raw ? Number(raw) : initial
    } catch (e) {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('anzahlSpieler', String(anzahl))
    } catch (e) {
      // ignore
    }
  }, [anzahl])

  return { anzahl, setAnzahl }
}
