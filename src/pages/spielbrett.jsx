// Hier sollen die Karten aus assets/img geladen und angezeigt werden
// Die Karten sollen gemischt werden
// Beim Klicken auf eine Karte soll diese umgedreht werden
// Wenn zwei Karten aufgedeckt sind, soll geprüft werden, ob sie übereinstimmen
// Stimmen sie überein, dann sollen sie vom Spielfeld entfernt werden und
// dem Spieler zugeordnet werden, der das Paar gefunden hat
// Stimmen sie nicht überein, dann sollen sie nach einer kurzen Verzögerung
// wieder umgedreht werden
// Es soll angezeigt werden, welcher Spieler gerade am Zug ist
// Es soll angezeigt werden, wie viele Paare jeder Spieler gefunden hat
// Das Spiel ist vorbei, wenn alle Karten aufgedeckt sind
// Es soll ein Button geben, um das Spiel neu zu starten
// Die Funktionenen dafür sollen in seperate Dateien ausgelagert werden
// Die Kartenbilder sollen in einem separaten Ordner liegen
// Die Spieler sollen in einem separaten Ordner liegen
// Die Spiellogik soll in einem separaten Ordner liegen
// Die UI-Komponenten sollen in einem separaten Ordner liegen

// Welche Ordnerstruktur ist sinnvoll?
/*src
├── assets
│   └── img
├── components
│   ├── Card.jsx
│   ├── Player.jsx
│   └── Scoreboard.jsx
├── hooks
│   └── useGameLogic.js
├── pages
│   └── Spielbrett.jsx
└── App.jsx
*/
// import { useState } from 'react'
// import './App.css'

// import React from 'react'
// import kartenArray from '../constanten/kartenaufruf.jsx'

// function Spielbrett() {
//   return (
//     <div>
//       <h1>Memory Spiel</h1>

//       <div className="karten-container">
//         {kartenArray.map((karte, index) => (
//           <img 
//           key={index} 
//           src={karte.img} 
//           alt={karte.name} />
//         //   alt={`Karte ${index}`} />
//         style={{ width: '80px', height: '80px', margin: '5px' }}
//         ))}
//       </div>
//     </div>
//   )
// }

 

// export default Spielbrett


import React from 'react'
import kartenArray from '../constanten/kartenaufruf.jsx'
import Rueckseite from '../assets/img/verdeckt.png'
// Das Mischen wird später importiert und verwendet
import {mischen} from '../funktionen/mischen.jsx'
// Hooks: kleine, wiederverwendbare Funktionen, die React-Zustand und Logik kapseln.
// Wir importieren drei Hooks, die zusammen die Spiellogik steuern:
// - useAufgedeckteKarten: verwaltet welche Karten aktuell aufgedeckt sind
// - useVergleicheKarten: liefert eine Funktion, die prüft, ob zwei aufgedeckte Karten ein Paar sind
// - useUmdrehenMitDelay: sorgt dafür, dass nichtübereinstimmende Karten nach kurzer Zeit wieder verdeckt werden
import { useAufgedeckteKarten } from '../hooks-useGameLogic/useAufgedeckteKarte.jsx'
import { useVergleicheKarten } from '../hooks-useGameLogic/useVergleicheKarte.jsx'
import { useUmdrehenMitDelay } from '../hooks-useGameLogic/useUmdrehenMitDelay.jsx' 
import { createDeck } from '../funktionen/createDeck.jsx'
import { useSpielstand } from '../hooks-useGameLogic/useSpielstand.jsx'
import { AUFGEDECKT_IMG } from '../hooks-useGameLogic/useVergleicheKarte.jsx'
import { useNavigate } from 'react-router-dom'

function Spielbrett({ anzahlSpieler = 2, playerNames = [], anzahlPaare, mode = 'local', difficulty = 'leicht' } ) {
  // Erzeuge dynamisch `anzahlSpieler` Spielstände.
  // Achtung: Hooks müssen in gleicher Reihenfolge aufgerufen werden.
  // Deshalb erzeugen wir ein Array von Hook-Instanzen mit fester Länge.
  const spielstaende = Array.from({ length: anzahlSpieler }, () => useSpielstand())
  // activePlayer ist ein Index (0..anzahlSpieler-1)
  const [activePlayer, setActivePlayer] = React.useState(0)

  // Deck erstellen: wir erzeugen ein Deck basierend auf kartenArray, aber
  // schneiden es auf die gewünschte Anzahl Paare zu (anzahlPaare).
  const [deck, setDeck] = React.useState(() => {
    const full = createDeck(kartenArray) // enthält alle Paare (verdoppelt)
    // Wenn anzahlPaare nicht gesetzt ist, verwenden wir alle verfügbaren Paare.
    const totalPairsAvailable = full.length / 2
    const pairsToUse = typeof anzahlPaare === 'number' && anzahlPaare > 0
      ? Math.min(anzahlPaare, totalPairsAvailable)
      : totalPairsAvailable
    const needed = pairsToUse * 2
    const cut = full.slice(0, needed)
    return mischen(cut)
  })
  const navigate = useNavigate()
  // Gesamtanzahl Paare, basierend auf dem initialen Deck
  const totalPairs = Math.floor(deck.length / 2)

  // Timer-Modus: einfache Stoppuhr
  // Countdown für Zeitmodus (time): Sekunden-Limit je nach difficulty
  const difficultySeconds = difficulty === 'superleicht' ? 300 : difficulty === 'leicht' ? 180 : difficulty === 'schwer' ? 120 : 60
  const [timeLeft, setTimeLeft] = React.useState(difficultySeconds)
  React.useEffect(() => {
    if (mode !== 'time') return undefined
    setTimeLeft(difficultySeconds)
    const t = setInterval(() => setTimeLeft(s => s - 1), 1000)
    return () => clearInterval(t)
  }, [mode, difficulty])

  // Wenn die Zeit abläuft, direkt GameOver (berechne Standings mit derzeitigen Paaren)
  React.useEffect(() => {
    if (mode !== 'time') return
    if (timeLeft <= 0) {
      const standings = spielstaende.map((sp, idx) => ({ name: playerNames[idx] || `Spieler ${idx + 1}`, paare: sp.paare }))
      navigate('/gameover', { state: { standings, totalPairs } })
    }
  }, [timeLeft])

  // Hilfsfunktion: Sekunden in MM:SS
  const formatTime = (s) => {
    const m = Math.floor(Math.max(0, s) / 60)
    const sec = Math.floor(Math.max(0, s) % 60)
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  // Computer player: sehr einfache KI, wählt zufällig zwei nicht gefundene Karten
  const isComputerMode = mode === 'computer'
  const computerDifficultyDelay = difficulty === 'superleicht' ? 800 : difficulty === 'leicht' ? 600 : difficulty === 'schwer' ? 400 : 200

  // Hier rufen wir die Hooks *auf* und lesen deren Rückgaben aus:
  // useAufgedeckteKarten() -> liefert { aufgedeckt, karteUmdrehen, reset }
  // - aufgedeckt: Array mit Indizes der aktuell offenen Karten
  // - karteUmdrehen(index): Funktion, die beim Klick eine Karte öffnet
  // - reset(): Funktion, um die offenen Karten wieder zu schließen
  const { aufgedeckt, karteUmdrehen, reset } = useAufgedeckteKarten()

  // useVergleicheKarten() -> liefert { istPaar }
  // - istPaar(karten, aufgedeckt) ist eine Funktion, die true zurückgibt,
  //   wenn die beiden aufgedeckten Karten dasselbe Motiv haben.
  const { istPaar } = useVergleicheKarten()

  // Wir rufen die Vergleichsfunktion mit den aktuellen Kartendaten und
  // dem aktuellen `aufgedeckt`-Array auf — das Ergebnis ist ein Boolean.
  const istPaarErgebnis = istPaar(deck, aufgedeckt)

  // NEU: Callback, der ausgeführt wird, wenn ein Paar gefunden wurde.
  // Er benutzt setDeck (aus dem Component-State), darum als useCallback
  // damit die Funktion zwischen Renders stabil bleibt.
  // handleMatch wird aufgerufen, wenn zwei aufgedeckte Karten ein Paar sind.
  // Wir arbeiten mit dem vorherigen Deck-State, ermitteln die betroffenen Karten
  // und übergeben dem aktuellen Spieler das gefundene Paar.
  const handleMatch = React.useCallback((indices) => {
    // Benutze den prev-State, um sicher die richtigen Karten zu ermitteln
    setDeck(prev => {
      const foundCards = indices.map(i => prev[i] ? { ...prev[i] } : null).filter(Boolean)
      // füge die gefundenen Karten dem aktiven Spieler hinzu
      spielstaende[activePlayer].addFound(foundCards)
      // Entferne die gefundenen Karten aus dem Deck (Loch), behalte Indizes
      return prev.map((c, i) => (indices.includes(i) ? null : c))
    })
    // Wenn ein Spieler ein Paar findet, bleibt er am Zug (kein Wechsel)
  }, [setDeck, activePlayer])

  // useUmdrehenMitDelay(aufgedeckt, reset, istPaarErgebnis)
  // - Dieser Hook beobachtet das `aufgedeckt`-Array. Wenn zwei Karten offen
  //   sind und `istPaarErgebnis` false ist, startet er einen Timer und ruft
  //   nach 1 Sekunde `reset()` auf, damit die Karten wieder verdeckt werden.
  // onNoMatch: Spielerwechsel nur bei Fehlversuch
  // handleNoMatch wird aufgerufen, wenn zwei aufgedeckte Karten kein Paar sind.
  // In dem Fall wechselt der aktive Spieler.
  const handleNoMatch = React.useCallback(() => {
    setActivePlayer(prev => {
      const next = (prev + 1) % spielstaende.length
      setTurnPlayerIndex(next)
      setTurnMessage(`${playerNames[next] || `Spieler ${next + 1}`} ist dran`)
      setTimeout(() => setTurnMessage(''), 900)
      return next
    })
  }, [setActivePlayer, spielstaende.length])

  useUmdrehenMitDelay(aufgedeckt, reset, istPaarErgebnis, handleMatch, handleNoMatch)

  // Computerzug auslösen, wenn activePlayer ist Computer
  React.useEffect(() => {
    if (!isComputerMode) return
    // finde index des Computer-Spielers (angenommen letzter Spieler ist Computer)
    const compIndex = playerNames.findIndex(n => n === 'Computer')
    if (compIndex === -1) return
    if (activePlayer !== compIndex) return
    // warte kurz, dann wähle zwei zufällige Karten
    const timeout = setTimeout(() => {
      const available = deck.map((c, i) => (c ? i : -1)).filter(i => i >= 0)
      if (available.length < 2) return
      // Zufällige Auswahl (keine Intelligenz) — kann später verbessert werden
      const shuffled = available.sort(() => Math.random() - 0.5)
      const pick = shuffled.slice(0, 2)
      pick.forEach(idx => karteUmdrehen(idx))
    }, computerDifficultyDelay)
    return () => clearTimeout(timeout)
  }, [activePlayer, deck, isComputerMode, playerNames, karteUmdrehen, computerDifficultyDelay])
  // Teile die Spielstände in linke (ungerade) und rechte (gerade) Spalten auf.
  // Wir nummerieren Spieler 1..N (idx + 1). Spieler mit (idx+1)%2 === 1 sind ungerade.
  const leftPlayers = spielstaende.map((sp, idx) => ({ sp, idx })).filter(({ idx }) => idx % 2 === 0)
  const rightPlayers = spielstaende.map((sp, idx) => ({ sp, idx })).filter(({ idx }) => idx % 2 === 1)

  // Wenn alle Paare gefunden sind, navigieren wir zur GameOver-Seite.
  const foundTotal = spielstaende.reduce((s, p) => s + p.paare, 0)
  // --- Audio helpers ---
  const audioCtxRef = React.useRef(null)
  function ensureAudioCtx() {
    if (!audioCtxRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext
      audioCtxRef.current = new Ctx()
    }
    return audioCtxRef.current
  }
  function playBeep(freq = 880, duration = 120, type = 'sine') {
    try {
      const ctx = ensureAudioCtx()
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = type
      o.frequency.value = freq
      o.connect(g)
      g.connect(ctx.destination)
      g.gain.setValueAtTime(0.0001, ctx.currentTime)
      g.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + 0.01)
      o.start()
      setTimeout(() => {
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.02)
        o.stop(ctx.currentTime + 0.03)
      }, duration)
    } catch (e) {
      // ignore
    }
  }
  function playWarningSequence() {
    playBeep(880, 100)
    setTimeout(() => playBeep(660, 100), 180)
    setTimeout(() => playBeep(880, 140), 360)
  }

  const [turnMessage, setTurnMessage] = React.useState('')
  const [turnPlayerIndex, setTurnPlayerIndex] = React.useState(null)
  React.useEffect(() => {
    if (foundTotal >= totalPairs && totalPairs > 0) {
      // Baue die Standings-Liste
      const standings = spielstaende.map((sp, idx) => ({ name: playerNames[idx] || `Spieler ${idx + 1}`, paare: sp.paare }))
      navigate('/gameover', { state: { standings, totalPairs } })
    }
  }, [foundTotal, totalPairs, navigate])

  // Spiele Ton wenn turnMessage erscheint
  React.useEffect(() => {
    if (turnMessage && typeof turnPlayerIndex === 'number') {
      const name = playerNames[turnPlayerIndex]
      // don't beep when the next player is the Computer (or unnamed)
      if (name && name !== 'Computer') playBeep(1000, 100, 'square')
    }
  }, [turnMessage])

  // Warnton bei Beginn der letzten 10 Sekunden (einmalig pro Runde)
  const warnedRef = React.useRef(false)
  React.useEffect(() => {
    if (mode !== 'time') return
    if (timeLeft <= 10 && !warnedRef.current && timeLeft > 0) {
      warnedRef.current = true
      playWarningSequence()
    }
    if (timeLeft > 10) warnedRef.current = false
  }, [timeLeft, mode])

  return (
    <div>
      <h1>Memory Spiel</h1>
      <div className="spiel-layout">
  {/* Linke Spalte: ungerade Spieler, untereinander */}
  <div className="players-column players-fixed-left">
          {leftPlayers.map(({ sp, idx }) => (
            <div key={idx} className={`spieler-stapel ${activePlayer === idx ? 'active-player' : ''}`}>
              <h4 style={{ color: activePlayer === idx ? 'yellow' : 'white' }}>{playerNames[idx] || `Spieler ${idx + 1}`} - Gefunden ({sp.paare})</h4>
              <div className="spieler-found-images">
                {sp.gefunden.map((k, i) => (
                  <img key={k.pairKey + '-' + i} src={AUFGEDECKT_IMG} alt={k.name} style={{ width: 40, margin: 2 }} />
                ))}
              </div>
            </div>
          ))}
        </div>

  {/* Mittlere Spalte: Spielbrett */}
        <div className="board-center">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
            <div>Gefundene Paare: {spielstaende.reduce((s, p) => s + p.paare, 0)} </div>
            {mode === 'time' && (
              <div style={{ fontWeight: 'bold', color: timeLeft <= 10 ? 'crimson' : 'white' }}>
                Zeit: {formatTime(timeLeft)}
              </div>
            )}
          </div>
          {turnMessage && <div style={{ textAlign: 'center', marginBottom: 6, color: 'lightgreen' }}>{turnMessage}</div>}
          <div className="karten-container">
            {deck.map((karte, index) => (
              // Wenn die Karte null ist, rendern wir ein leeres Feld (Loch)
              karte === null ? (
                <div key={`empty-${index}`} className="karte-leer" />
              ) : (
                <img
                  key={karte.instanceId}
                  src={aufgedeckt.includes(index) ? karte.img : Rueckseite}
                  alt={karte.name}
                  onClick={() => karte.status !== 'found' && karteUmdrehen(index)}
                />
              )
            ))}
          </div>
        </div>

  {/* Rechte Spalte: gerade Spieler, untereinander */}
  <div className="players-column players-fixed-right">
          {rightPlayers.map(({ sp, idx }) => (
            <div key={idx} className={`spieler-stapel ${activePlayer === idx ? 'active-player' : ''}`}>
              <h4 style={{ color: activePlayer === idx ? 'yellow' : 'white' }}>{playerNames[idx] || `Spieler ${idx + 1}`} - Gefunden ({sp.paare})</h4>
              <div className="spieler-found-images">
                {sp.gefunden.map((k, i) => (
                  <img key={k.pairKey + '-' + i} src={AUFGEDECKT_IMG} alt={k.name} style={{ width: 40, margin: 2 }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Spielbrett