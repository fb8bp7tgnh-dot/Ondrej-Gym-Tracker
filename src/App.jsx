
export default function App(){
  const cards=[
    ['💪 Síla','+2.8 %'],
    ['⚖️ Váha','-0.5 %'],
    ['😴 Spánek','+8.1 %'],
    ['🔥 Konzistence','100 %'],
    ['🏆 PR','3'],
    ['❤️ Recovery','82/100']
  ];
  return (
    <div style={{fontFamily:'Arial',padding:20,maxWidth:500,margin:'auto'}}>
      <h1>Ondřej Gym Tracker</h1>
      <p>Mobilní prototyp v0.3</p>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        {cards.map(c=>(
          <div key={c[0]} style={{border:'1px solid #ddd',borderRadius:16,padding:14}}>
            <div>{c[0]}</div>
            <div style={{fontSize:24,fontWeight:'bold'}}>{c[1]}</div>
          </div>
        ))}
      </div>

      <h2 style={{marginTop:24}}>Dnešní trénink</h2>
      <div style={{border:'1px solid #ddd',borderRadius:16,padding:14}}>
        <h3>FB-A</h3>
        <table width="100%">
          <thead>
            <tr><th>Cvik</th><th>Posledně</th></tr>
          </thead>
          <tbody>
            <tr><td>Flat Press</td><td>80 × 8/8/7/6</td></tr>
            <tr><td>Viking Press</td><td>30 × 8/7/6</td></tr>
            <tr><td>Lat Pulldown</td><td>75 × 10/10/9</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
