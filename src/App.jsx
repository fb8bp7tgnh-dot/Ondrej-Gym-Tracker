
import { useEffect, useState } from 'react'

const plans = {
  'FB-A':['Flat Chest Press','Incline Chest Press','Lat Pulldown','Romanian Deadlift'],
  'FB-B':['Viking Press','Chest Supported Row','Cable Fly','Leg Press'],
  'FB-C':['Flat Chest Press','Pull Up','Peck Deck','Trap Bar Deadlift']
}

const emptyRow = {kg:'',s1:'',s2:'',s3:'',s4:''}
const today = new Date().toISOString().split('T')[0]

export default function App(){
  const [plan,setPlan] = useState(localStorage.getItem('plan') || 'FB-A')
  const [screen,setScreen] = useState('home')
  const [sleep,setSleep] = useState(localStorage.getItem('sleep') || '')
  const [fatigue,setFatigue] = useState(Number(localStorage.getItem('fatigue') || 3))
  const [data,setData] = useState(JSON.parse(localStorage.getItem('workoutData') || '{}'))
  const [history,setHistory] = useState(JSON.parse(localStorage.getItem('history') || '{}'))

  useEffect(()=>localStorage.setItem('workoutData', JSON.stringify(data)), [data])
  useEffect(()=>localStorage.setItem('history', JSON.stringify(history)), [history])
  useEffect(()=>localStorage.setItem('sleep', sleep), [sleep])
  useEffect(()=>localStorage.setItem('fatigue', fatigue), [fatigue])
  useEffect(()=>localStorage.setItem('plan', plan), [plan])

  const volume = (row) => {
    if(!row || !row.kg) return 0
    const reps = (Number(row.s1)||0)+(Number(row.s2)||0)+(Number(row.s3)||0)+(Number(row.s4)||0)
    return (Number(row.kg)||0) * reps
  }

  const previousVolume = (exercise) => {
    const dates = Object.keys(history).sort()
    const previous = dates.filter(d => d !== today).pop()
    if(!previous || !history[previous]?.[exercise]) return 0
    return volume(history[previous][exercise])
  }

  const updateExercise = (exercise, field, value) => {
    const updated = {
      ...(data[exercise] || emptyRow),
      [field]: value
    }

    setData(prev => ({...prev,[exercise]:updated}))
    setHistory(prev => ({
      ...prev,
      [today]:{
        ...(prev[today] || {}),
        [exercise]:updated
      }
    }))
  }

  const totalVolume = Object.values(data).reduce((sum,row)=>sum+volume(row),0)

  if(screen === 'recovery'){
    return (
      <div style={{maxWidth:700,margin:'0 auto',padding:16,fontFamily:'Arial'}}>
        <button onClick={()=>setScreen('home')}>← Zpět</button>
        <h2>Recovery</h2>

        <p>Spánek (hodiny)</p>
        <input value={sleep} onChange={e=>setSleep(e.target.value)} />

        <p>Únava</p>
        <div style={{display:'flex',gap:8}}>
          {[1,2,3,4,5].map(v=>(
            <button key={v}
              onClick={()=>setFatigue(v)}
              style={{
                width:42,
                height:42,
                borderRadius:12,
                border: fatigue===v ? '3px solid black' : '1px solid #ccc'
              }}>
              {v}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{maxWidth:900,margin:'0 auto',padding:16,fontFamily:'Arial'}}>
      <h1>💪 Ondřej Gym Tracker v1.1</h1>
      <small>{today}</small>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:12}}>
        <div style={{border:'1px solid #ddd',borderRadius:16,padding:16}}>💪 Síla<br/><b>{totalVolume} kg</b></div>
        <div style={{border:'1px solid #ddd',borderRadius:16,padding:16}}>😴 Spánek<br/><b>{sleep || '-'} h</b></div>
        <div onClick={()=>setScreen('recovery')} style={{border:'1px solid #ddd',borderRadius:16,padding:16,cursor:'pointer'}}>❤️ Recovery<br/><b>{fatigue}/5</b></div>
      </div>

      <h2>Dnešní trénink</h2>

      <select value={plan} onChange={e=>setPlan(e.target.value)}>
        {Object.keys(plans).map(p=><option key={p}>{p}</option>)}
      </select>

      <table style={{width:'100%',marginTop:12}}>
        <thead>
          <tr>
            <th>Cvik</th><th>Kg</th><th>S1</th><th>S2</th><th>S3</th><th>S4</th><th>Objem</th><th>Δ%</th>
          </tr>
        </thead>
        <tbody>
          {plans[plan].map(ex=>{
            const row = data[ex] || emptyRow
            const current = volume(row)
            const previous = previousVolume(ex)
            const delta = previous > 0 ? (((current-previous)/previous)*100).toFixed(1) : null

            return (
              <tr key={ex}>
                <td>{ex}</td>
                {['kg','s1','s2','s3','s4'].map(field=>(
                  <td key={field}>
                    <input
                      value={row[field] || ''}
                      onChange={e=>updateExercise(ex,field,e.target.value)}
                      style={{width:'40px',padding:'2px',textAlign:'center'}}
                    />
                  </td>
                ))}
                <td><b>{current}</b></td>
                <td>{delta !== null ? `${delta > 0 ? '+' : ''}${delta}%` : '-'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
