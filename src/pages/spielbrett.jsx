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

const doppelteKarten = mischen ([...kartenArray, ...kartenArray])

function Spielbrett() {
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
  const istPaarErgebnis = istPaar(doppelteKarten, aufgedeckt)

  // useUmdrehenMitDelay(aufgedeckt, reset, istPaarErgebnis)
  // - Dieser Hook beobachtet das `aufgedeckt`-Array. Wenn zwei Karten offen
  //   sind und `istPaarErgebnis` false ist, startet er einen Timer und ruft
  //   nach 1 Sekunde `reset()` auf, damit die Karten wieder verdeckt werden.
  useUmdrehenMitDelay(aufgedeckt, reset, istPaarErgebnis)

  return (
    <div>
      <h1>Memory Spiel</h1>
      <div className="karten-container">
        {doppelteKarten.map((karte, index) => (
          <img
            key={index}
            // src: zeigt das Motiv, wenn die Karte im `aufgedeckt`-Array ist,
            // sonst zeigen wir die Rückseite (verdeckt.png).
            // So sieht der Spieler zuerst nur die Rückseiten und kann
            // durch Klicken die Karte umdrehen.
            src={aufgedeckt.includes(index) ? karte.img : Rueckseite}
            alt={karte.name}
            style={{ width: '80px', height: '80px', margin: '5px' }}
            // onClick: ruft die Funktion aus dem Hook `useAufgedeckteKarten`
            // auf. Diese Funktion fügt den Index in das `aufgedeckt`-Array ein
            // (aber nur, wenn weniger als zwei Karten bereits offen sind).
            // Dadurch wird die Karte sichtbar (siehe src oben).
            onClick={() => karteUmdrehen(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Spielbrett