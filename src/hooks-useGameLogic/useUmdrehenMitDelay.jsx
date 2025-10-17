
import { useEffect } from 'react'

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