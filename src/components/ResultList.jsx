import React from 'react'

export default function ResultList({ players }) {
  return (
    <div style={{ display: 'inline-block', textAlign: 'left', marginTop: 20 }}>
      <h3>Rangliste</h3>
      <ol>
        {players.map((p, idx) => (
          <li key={p.name + '-' + idx}>
            <strong>{p.name}</strong> — {p.paare} Paare
          </li>
        ))}
      </ol>
    </div>
  )
}
