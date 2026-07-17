
import {useState,useEffect} from 'react'

const plans={
'FB-A':['Hack Squat','Flat Chest Press','Incline Chest Press','Lat Pulldown'],
'FB-B':['Leg Press','Chest Supported Row','Viking Press','Cable Fly'],
'FB-C':['Trap Bar Deadlift','Flat Chest Press','Pull-Up','Peck Deck']
}

export default function App(){
 const [tab,setTab]=useState('dashboard')
 const [plan,setPlan]=useState('FB-A')
 const today=new Date().toLocaleDateString('cs-CZ')
 const [sleep,setSleep]=useState(localStorage.getItem('sleep')||'')
 const [fatigue,setFatigue]=useState(localStorage.getItem('fatigue')||'3')
 const [history,setHistory]=useState(JSON.parse(localStorage.getItem('history')||'{}'))

 useEffect(()=>localStorage.setItem('sleep',sleep),[sleep])
 useEffect(()=>localStorage.setItem('fatigue',fatigue),[fatigue])
 useEffect(()=>localStorage.setItem('history',JSON.stringify(history)),[history])

 const saveExercise=(ex,val)=>{
   setHistory(prev=>({...prev,[ex]:val}))
 }

 return <div style={{maxWidth:700,margin:'auto',padding:16,fontFamily:'Arial'}}>
 <h1>💪 Ondřej Gym Tracker v0.8</h1>
 <div>{today}</div>

 <div style={{display:'flex',gap:8,margin:'12px 0'}}>
 {['dashboard','training','recovery'].map(t=><button key={t} onClick={()=>setTab(t)}>{t}</button>)}
 </div>

 {tab==='dashboard' && <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
 {['Síla','Váha','Spánek','Recovery'].map(c=>
 <div key={c} style={{border:'1px solid #ddd',borderRadius:14,padding:18,cursor:'pointer'}}>
 <h3>{c}</h3><div>Klikni pro historii (v0.9)</div></div>)}
 </div>}

 {tab==='training' && <div>
 <select value={plan} onChange={e=>setPlan(e.target.value)}>
 {Object.keys(plans).map(p=><option key={p}>{p}</option>)}
 </select>
 <table style={{width:'100%',marginTop:10}}>
 <thead><tr><th>Cvik</th><th>Posledně</th><th>Dnes</th></tr></thead>
 <tbody>
 {plans[plan].map(ex=><tr key={ex}>
 <td>{ex}</td>
 <td>{history[ex]||'--'}</td>
 <td><input defaultValue={history[ex]||''} onBlur={e=>saveExercise(ex,e.target.value)} placeholder='80x8x8x7'/></td>
 </tr>)}
 </tbody>
 </table>
 </div>}

 {tab==='recovery' && <div>
 <p>Spánek (h)</p>
 <input value={sleep} onChange={e=>setSleep(e.target.value)}/>
 <p>Únava 1-5</p>
 <select value={fatigue} onChange={e=>setFatigue(e.target.value)}>
 {[1,2,3,4,5].map(v=><option key={v}>{v}</option>)}
 </select>
 <h3>Recovery score: {Math.max(0,100-(fatigue*10)+(sleep*5||0))}/100</h3>
 </div>}
 </div>
}
