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
// Das Mischen wird später importiert und verwendet
import {mischen} from '../funktionen/mischen.jsx'

const doppelteKarten = mischen ([...kartenArray, ...kartenArray])

function Spielbrett() {
  return (
    <div>
      <h1>Memory Spiel</h1>
      <div className="karten-container">
        {doppelteKarten.map((karte, index) => (
          <img
            key={index}
            src={karte.img}
            alt={karte.name}
            style={{ width: '80px', height: '80px', margin: '5px' }}
          />
        ))}
      </div>
    </div>
  )
}

export default Spielbrett