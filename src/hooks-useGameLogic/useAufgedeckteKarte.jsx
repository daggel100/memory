
import { useState } from 'react'

export function useAufgedeckteKarten() {
  const [aufgedeckt, setAufgedeckt] = useState([])

  function karteUmdrehen(index) {
    if (aufgedeckt.length < 2 && !aufgedeckt.includes(index)) {
      setAufgedeckt([...aufgedeckt, index])
    }
  }

  function reset() {
    setAufgedeckt([])
  }

  return { aufgedeckt, karteUmdrehen, reset }
}