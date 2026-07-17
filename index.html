
import { useEffect, useState } from 'react'

const plans={
 'FB-A':['Flat Chest Press','Incline Chest Press','Lat Pulldown','Romanian Deadlift'],
 'FB-B':['Viking Press','Chest Supported Row','Cable Fly','Leg Press'],
 'FB-C':['Flat Chest Press','Pull Up','Peck Deck','Trap Bar Deadlift']
}
const emptyRow={kg:'',s1:'',s2:'',s3:'',s4:''}
const today=new Date().toISOString().split('T')[0]

export default function App(){
 const [plan,setPlan]=useState(localStorage.getItem('plan')||'FB-A')
 const [screen,setScreen]=useState('home')
 const [sleep,setSleep]=useState(localStorage.getItem('sleep')||'')
 const [fatigue,setFatigue]=useState(Number(localStorage.getItem('fatigue')||3))
 const [bw,setBw]=useState(localStorage.getItem('bodyweight')||'86')
 const [data,setData]=useState(JSON.parse(localStorage.getItem('workoutData')||'{}'))
 const [history,setHistory]=useState(JSON.parse(localStorage.getItem('history')||'{}'))
 const [prs,setPrs]=useState(JSON.parse(localStorage.getItem('prs')||'{}'))

 useEffect(()=>localStorage.setItem('workoutData',JSON.stringify(data)),[data])
 useEffect(()=>localStorage.setItem('history',JSON.stringify(history)),[history])
 useEffect(()=>localStorage.setItem('prs',JSON.stringify(prs)),[prs])
 useEffect(()=>localStorage.setItem('bodyweight',bw),[bw])

 const volume=r=>(Number(r?.kg)||0)*((+r?.s1||0)+(+r?.s2||0)+(+r?.s3||0)+(+r?.s4||0))
 const totalVolume=Object.values(data).reduce((a,b)=>a+volume(b),0)

 const update=(ex,f,v)=>{
   const row={...(data[ex]||emptyRow),[f]:v}
   setData(p=>({...p,[ex]:row}))
 }

 const finishWorkout=()=>{
   const session={date:today,plan,bodyweight:bw,exercises:data,totalVolume}
   const h={...history,[today]:session}
   setHistory(h)

   const newPrs={...prs}
   Object.keys(data).forEach(ex=>{
      if(volume(data[ex])>(newPrs[ex]?.volume||0)){
         newPrs[ex]={volume:volume(data[ex]),kg:data[ex].kg}
      }
   })
   setPrs(newPrs)

   const cleared={}
   Object.keys(data).forEach(ex=>{
      cleared[ex]={kg:data[ex].kg,s1:'',s2:'',s3:'',s4:''}
   })
   setData(cleared)
   alert('Trénink uložen. Opakování vymazána, váhy zachovány.')
 }

 const exportBackup=()=>{
   const blob=new Blob([JSON.stringify(localStorage,null,2)],{type:'application/json'})
   const a=document.createElement('a')
   a.href=URL.createObjectURL(blob)
   a.download='gym-backup.json'
   a.click()
 }

 return <div style={{maxWidth:900,margin:'0 auto',padding:16,fontFamily:'Arial'}}>
 <h1>💪 Ondřej Gym Tracker v2.0</h1>
 <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
   <div style={{border:'1px solid #ddd',borderRadius:12,padding:12,cursor:'pointer'}}>💪<br/>{totalVolume}kg</div>
   <div style={{border:'1px solid #ddd',borderRadius:12,padding:12}}>⚖️<br/><input value={bw} onChange={e=>setBw(e.target.value)} style={{width:'50px'}}/></div>
   <div onClick={()=>setScreen('recovery')} style={{border:'1px solid #ddd',borderRadius:12,padding:12,cursor:'pointer'}}>😴<br/>{sleep||'-'}h</div>
   <div style={{border:'1px solid #ddd',borderRadius:12,padding:12}}>🏆<br/>{Object.keys(prs).length} PR</div>
 </div>

 {screen==='recovery' && <div><h3>Recovery</h3><input value={sleep} onChange={e=>setSleep(e.target.value)} placeholder='spánek'/>{[1,2,3,4,5].map(v=><button key={v} onClick={()=>setFatigue(v)}>{v}</button>)}</div>}

 <h2>{plan}</h2>
 <select value={plan} onChange={e=>setPlan(e.target.value)}>{Object.keys(plans).map(p=><option key={p}>{p}</option>)}</select>

 <table style={{width:'100%'}}>
 <thead><tr><th>Cvik</th><th>Kg</th><th>S1</th><th>S2</th><th>S3</th><th>S4</th><th>Objem</th></tr></thead>
 <tbody>
 {plans[plan].map(ex=>{
 const row=data[ex]||emptyRow
 return <tr key={ex}>
 <td>{ex}</td>
 {['kg','s1','s2','s3','s4'].map(f=><td key={f}><input value={row[f]||''} onChange={e=>update(ex,f,e.target.value)} style={{width:'40px'}}/></td>)}
 <td>{volume(row)}</td>
 </tr>
 })}
 </tbody>
 </table>
 <br/>
 <button onClick={finishWorkout}>🏁 Ukončit trénink</button>
 <button onClick={exportBackup} style={{marginLeft:10}}>📦 Export</button>
 </div>
}
