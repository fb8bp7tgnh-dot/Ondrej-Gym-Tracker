
import {useState} from 'react';
const plans={
"A":["Hack Squat","Flat Chest Press","Incline Chest Press","Lat Pulldown","Romanian Deadlift","Lateral Raise","Biceps Curl","Triceps Pushdown"],
"B":["Leg Press","Incline Chest Press","Chest Supported Row","Leg Curl","Viking Press","Cable Fly","Hammer Curl","Overhead Triceps Extension"],
"C":["Trap Bar Deadlift","Flat Chest Press","Incline Chest Press","Pull-Up","Peck Deck","Lateral Raise","Preacher Curl","Triceps Pushdown"]
}
export default function App(){
 const [tab,setTab]=useState("dashboard");
 const [plan,setPlan]=useState("A");
 const cards=[["💪 Síla","+2.8%"],["⚖️ Váha","86kg"],["😴 Spánek","7.4h"],["❤️ Recovery","82"]];
 return <div style={{fontFamily:"Arial",maxWidth:600,margin:"auto",padding:12}}>
 <h2>Ondřej Gym Tracker v0.7</h2>
 <div style={{display:"flex",gap:8,marginBottom:12}}>
 {["dashboard","training","recovery"].map(t=><button key={t} onClick={()=>setTab(t)}>{t}</button>)}
 </div>
 {tab==="dashboard" && <div style={{display:"grid",gridTemplateColumns":"1fr 1fr",gap:10}}>
 {cards.map(c=><div key={c[0]} style={{border:"1px solid #ddd",borderRadius:12,padding:12}}><div>{c[0]}</div><h3>{c[1]}</h3></div>)}
 </div>}
 {tab==="training" && <div>
 <select value={plan} onChange={e=>setPlan(e.target.value)}>
 <option value="A">FB-A</option><option value="B">FB-B</option><option value="C">FB-C</option>
 </select>
 <table width="100%" border="1" style={{marginTop:10}}>
 <thead><tr><th>Cvik</th><th>Posledně</th><th>Dnes</th></tr></thead>
 <tbody>{plans[plan].map(ex=><tr key={ex}><td>{ex}</td><td>--</td><td><input placeholder="váha/op."/></td></tr>)}</tbody>
 </table></div>}
 {tab==="recovery" && <div><input placeholder="Spánek (h)"/><br/><select><option>Únava 1</option><option>Únava 2</option><option>Únava 3</option><option>Únava 4</option><option>Únava 5</option></select></div>}
 </div>
}
