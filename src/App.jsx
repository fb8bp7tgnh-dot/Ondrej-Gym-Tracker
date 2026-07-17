
import {useEffect, useState} from 'react'

const plans = {
  'FB-A':['Flat Chest Press','Incline Chest Press','Lat Pulldown','Romanian Deadlift'],
  'FB-B':['Viking Press','Chest Supported Row','Cable Fly','Leg Press'],
  'FB-C':['Flat Chest Press','Pull Up','Peck Deck','Trap Bar Deadlift']
}

const emptyRow = {kg:'',s1:'',s2:'',s3:'',s4:''}

export default function App(){
  const [plan,setPlan] = useState(localStorage.getItem('plan') || 'FB-A')
  const [screen,setScreen] = useState('home')
  const [sleep,setSleep] = useState(localStorage.getItem('sleep') || '')
  const [fatigue,setFatigue] = useState(Number(localStorage.getItem('fatigue') || 3))
  const [data,setData] = useState(JSON.parse(localStorage.getItem('workoutData') || '{}'))

  useEffect(()=>localStorage.setItem('workoutData', JSON.stringify(data)), [data])
  useEffect(()=>localStorage.setItem('sleep', sleep), [sleep])
  useEffect(()=>localStorage.setItem('fatigue', fatigue), [fatigue])
  useEffect(()=>localStorage.setItem('plan', plan), [plan])

  const updateExercise = (exercise, field, value) => {
    setData(prev => ({
      ...prev,
      [exercise]: {
        ...(prev[exercise] || emptyRow),
        [field]: value
      }
    }))
  }

  const volume = (row) => {
    if(!row || !row.kg) return 0
    const reps = ['s1','s2','s3','s4'].reduce((a,k)=>a+(Number(row[k])||0),0)
    return (Number(row.kg)||0) * reps
  }

  const totalVolume = Object.values(data).reduce((a,row)=>a+volume(row),0)

  if(screen === 'recovery'){
    return (
      <div style={{maxWidth:800,margin:'0 auto',padding:16,fontFamily:'Arial'}}>
        <button onClick={()=>setScreen('home')}>← Zpět</button>
        <h2>Recovery</h2>
        <p>Spánek (h)</p>
        <input value={sleep} onChange={e=>setSleep(e.target.value)} />
        <p>Únava</p>
        <div style={{display:'flex',gap:10}}>
          {[1,2,3,4,5].map(v=>(
            <button key={v}
              onClick={()=>setFatigue(v)}
              style={{
                width:55,height:55,borderRadius:14,
                border: fatigue===v ? '3px solid black':'1px solid #ccc'
              }}>{v}</button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{maxWidth:900,margin:'0 auto',padding:16,fontFamily:'Arial'}}>
      <h1>💪 Ondřej Gym Tracker v1.0</h1>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        <div style={{border:'1px solid #ddd',borderRadius:16,padding:16}}>💪 Síla<br/><b>{totalVolume} kg</b></div>
        <div style={{border:'1px solid #ddd',borderRadius:16,padding:16}}>⚖️ Váha<br/><b>86 kg</b></div>
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
            <th>Cvik</th><th>Kg</th><th>S1</th><th>S2</th><th>S3</th><th>S4</th><th>Objem</th>
          </tr>
        </thead>
        <tbody>
          {plans[plan].map(ex=>{
            const row = data[ex] || emptyRow
            return (
              <tr key={ex}>
                <td>{ex}</td>
                {['kg','s1','s2','s3','s4'].map(field=>(
                  <td key={field}>
                    <input
                      value={row[field] || ''}
                      onChange={e=>updateExercise(ex, field, e.target.value)}
                      style={{width:'55px'}}
                    />
                  </td>
                ))}
                <td><b>{volume(row)}</b></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
