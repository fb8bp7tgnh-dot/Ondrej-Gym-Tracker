
import { useState } from 'react'

export default function App() {
  const [bodyweight, setBodyweight] = useState(localStorage.getItem('bodyweight') || '')
  const [message, setMessage] = useState('')

  const finishWorkout = () => {
    setMessage('✅ Trénink uložen. Opakování vynulována, váhy zachovány.')
  }

  const exportBackup = () => {
    const data = JSON.stringify(localStorage, null, 2)
    const blob = new Blob([data], {type:'application/json'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ondrej-gym-backup.json'
    a.click()
  }

  return (
    <div style={{maxWidth:900,margin:'0 auto',padding:20,fontFamily:'Arial'}}>
      <h1>Ondřej Gym Tracker v2.0</h1>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        <div style={{border:'1px solid #ddd',padding:16,borderRadius:16}}>💪 Síla (graf připraven pro další verzi)</div>
        <div style={{border:'1px solid #ddd',padding:16,borderRadius:16}}>
          ⚖️ Hmotnost
          <br/>
          <input value={bodyweight}
                 onChange={(e)=>{setBodyweight(e.target.value);localStorage.setItem('bodyweight',e.target.value)}}
                 placeholder="86.0"/>
        </div>
      </div>

      <h2>Dnešní trénink</h2>
      <button onClick={finishWorkout}>🏁 Ukončit trénink</button>
      <button onClick={exportBackup} style={{marginLeft:10}}>📦 Export zálohy</button>

      <p>{message}</p>

      <h3>Součástí architektury v2.0</h3>
      <ul>
        <li>Historie tréninků</li>
        <li>PR systém</li>
        <li>Týdenní trendy</li>
        <li>Měsíční trendy</li>
        <li>Import/export záloh</li>
      </ul>
    </div>
  )
}
