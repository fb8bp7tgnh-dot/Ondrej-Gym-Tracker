
import { useState } from 'react'

const plans={
'FB-A':['Flat Chest Press','Incline Chest Press','Lat Pulldown','Romanian Deadlift'],
'FB-B':['Viking Press','Chest Supported Row','Cable Fly','Leg Press'],
'FB-C':['Flat Chest Press','Pull Up','Peck Deck','Trap Bar Deadlift']
}

export default function App(){
 const [plan,setPlan]=useState('FB-A')
 const [fatigue,setFatigue]=useState(3)

 const cards=[['💪 Síla','+2.8%'],['⚖️ Váha','86kg'],['😴 Spánek','7.3h'],['❤️ Recovery','82']]
 return (
 <div style={{maxWidth:800,margin:'auto',padding:16,fontFamily:'Arial'}}>
   <h1>Ondřej Gym Tracker v0.9</h1>

   <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
     {cards.map(c=><div key={c[0]} style={{border:'1px solid #ddd',borderRadius:16,padding:16,cursor:'pointer'}}>
       <div>{c[0]}</div><h2>{c[1]}</h2>
     </div>)}
   </div>

   <h2 style={{marginTop:24}}>Dnešní trénink</h2>

   <select value={plan} onChange={e=>setPlan(e.target.value)}>
    <option>FB-A</option><option>FB-B</option><option>FB-C</option>
   </select>

   <table style={{width:'100%',marginTop:12}}>
    <thead>
     <tr><th>Cvik</th><th>Kg</th><th>S1</th><th>S2</th><th>S3</th><th>S4</th></tr>
    </thead>
    <tbody>
    {plans[plan].map(ex=>(
      <tr key={ex}>
       <td>{ex}</td>
       <td><input style={{width:'55px'}}/></td>
       <td><input style={{width:'45px'}}/></td>
       <td><input style={{width:'45px'}}/></td>
       <td><input style={{width:'45px'}}/></td>
       <td><input style={{width:'45px'}}/></td>
      </tr>
    ))}
    </tbody>
   </table>

   <h2 style={{marginTop:24}}>Recovery</h2>
   <div style={{display:'flex',gap:10}}>
   {[1,2,3,4,5].map(v=>(
    <button key={v}
      onClick={()=>setFatigue(v)}
      style={{
       width:50,height:50,borderRadius:12,
       border: fatigue===v ? '3px solid black':'1px solid #ccc'
      }}>
      {v}
    </button>
   ))}
   </div>

   <p>Vybraná únava: {fatigue}/5</p>
 </div>)
}
