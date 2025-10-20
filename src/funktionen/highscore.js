const KEY = 'memory_highscores_v1'

export function loadHighscores() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch (e) {
    console.error('Fehler beim Laden der Highscores', e)
    return []
  }
}

export function saveHighscore(entry) {
  // entry: { name, score, date }
  const list = loadHighscores()
  // Füge oder aktualisiere Eintrag für denselben Namen
  const existing = list.find(i => i.name === entry.name)
  if (existing) {
    // Wenn neuer Score besser, überschreiben
    if (entry.score > existing.score) {
      existing.score = entry.score
      existing.date = entry.date
    }
  } else {
    list.push(entry)
  }
  // Sortiere absteigend nach score
  list.sort((a, b) => b.score - a.score)
  // Begrenze Liste optional (z.B. top 100)
  const trimmed = list.slice(0, 100)
  localStorage.setItem(KEY, JSON.stringify(trimmed))
  return trimmed
}

export function clearHighscores() {
  localStorage.removeItem(KEY)
}
