
import { useState } from 'react'

const plans = {
  "FB-A": ["Hack Squat","Flat Chest Press","Incline Chest Press","Lat Pulldown","Romanian Deadlift","Lateral Raise","Biceps Curl","Triceps Pushdown"],
  "FB-B": ["Leg Press","Incline Chest Press","Chest Supported Row","Leg Curl","Viking Press","Cable Fly","Hammer Curl","Overhead Triceps Extension"],
  "FB-C": ["Trap Bar Deadlift","Flat Chest Press","Incline Chest Press","Pull-Up","Peck Deck","Lateral Raise","Preacher Curl","Triceps Pushdown"]
}

export default function App() {
  const [tab,setTab] = useState('dashboard')
  const [plan,setPlan] = useState('FB-A')

  const cards = [
    ['💪 Síla','+2.8 %'],
    ['⚖️ Váha','86 kg'],
    ['😴 Spánek','7.4 h'],
    ['❤️ Recovery','82/100']
  ]

  return (
    <div style={{fontFamily:'Arial',maxWidth:'700px',margin:'0 auto',padding:'16px'}}>
      <h1>Ondřej Gym Tracker v0.7.1</h1>

      <div style={{display:'flex',gap:'8px',marginBottom:'16px'}}>
        {['dashboard','training','recovery'].map(item => (
          <button key={item} onClick={() => setTab(item)}>{item}</button>
        ))}
      </div>

      {tab === 'dashboard' && (
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
          {cards.map(card => (
            <div key={card[0]} style={{border:'1px solid #ddd', borderRadius:'12px', padding:'12px'}}>
              <div>{card[0]}</div>
              <h3>{card[1]}</h3>
            </div>
          ))}
        </div>
      )}

      {tab === 'training' && (
        <div>
          <select value={plan} onChange={(e)=>setPlan(e.target.value)}>
            <option>FB-A</option>
            <option>FB-B</option>
            <option>FB-C</option>
          </select>

          <table style={{width:'100%',marginTop:'12px'}}>
            <thead>
              <tr><th>Cvik</th><th>Posledně</th><th>Dnes</th></tr>
            </thead>
            <tbody>
              {plans[plan].map(exercise => (
                <tr key={exercise}>
                  <td>{exercise}</td>
                  <td>--</td>
                  <td><input placeholder="váha / opakování" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'recovery' && (
        <div>
          <input placeholder="Spánek (hodiny)" />
        </div>
      )}
    </div>
  )
}
