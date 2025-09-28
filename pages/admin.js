import React, { useEffect, useState } from 'react'
import Header from '../components/Header'

export default function Admin(){
  const [config, setConfig] = useState(null);
  const [partners, setPartners] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(()=>{
    fetch('/api/config').then(r=>r.json()).then(base=>{
      const saved = localStorage.getItem('bimbites_admin');
      if(saved){
        try{ const s = JSON.parse(saved); setPartners(s); setConfig(base); return; }catch(e){}
      }
      setPartners(base.partners || []);
      setConfig(base);
    });
  },[]);

  useEffect(()=>{
    if(partners) localStorage.setItem('bimbites_admin', JSON.stringify(partners));
  },[partners]);

  if(!config) return <div className="p-8">Loading admin…</div>;

  const addItem = (restId) => {
    const name = prompt('Item name');
    if(!name) return;
    const price = parseFloat(prompt('Price (BBD)')) || 0;
    const desc = prompt('Short description') || '';
    setPartners(ps => ps.map(p=> p.id===restId ? {...p, menu: [...p.menu, { id: restId + '_' + Date.now(), name, desc, price }]} : p));
    setSelected(restId);
  };

  const removeItem = (restId, itemId) => {
    setPartners(ps => ps.map(p=> p.id===restId ? {...p, menu: p.menu.filter(m=>m.id!==itemId)} : p));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={0} onCartClick={()=>{}} />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Admin — Partner & Menu Manager</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 bg-white p-3 rounded shadow">
            <h2 className="font-semibold mb-2">Partners</h2>
            <ul>
              {partners.map(p=> (
                <li key={p.id} className="py-2 border-b">
                  <button onClick={()=>setSelected(p.id)} className="text-left w-full">{p.name}</button>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <button onClick={()=>{ const id = 'new_'+Date.now(); setPartners(ps=>[{id,name:'New Partner',banner:'/images/placeholder.jpg',cuisine:'',eta:20,distanceKm:1.0,rating:4.0,menu:[],},...ps]); }} className="px-3 py-2 border rounded">Add Partner</button>
              <button onClick={()=>{ localStorage.removeItem('bimbites_admin'); window.location.reload(); }} className="ml-2 px-3 py-2 border rounded">Reset Edits</button>
            </div>
          </div>
          <div className="col-span-2 bg-white p-3 rounded shadow">
            {!selected ? <div className="text-gray-500">Select a partner to edit</div> : (()=>{
              const p = partners.find(x=>x.id===selected);
              if(!p) return <div className="text-red-500">Partner not found</div>;
              return (
                <div>
                  <div className="flex items-center mb-3">
                    <div><img src={p.banner} alt={p.name} className="w-32 h-20 object-cover rounded"/></div>
                    <div className="ml-4">
                      <div className="font-semibold text-lg">{p.name}</div>
                      <div className="text-sm text-gray-500">{p.cuisine}</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Menu items</h3>
                    {p.menu.map(m=> (
                      <div key={m.id} className="flex items-start justify-between py-2 border-b">
                        <div>
                          <div className="font-medium">{m.name}</div>
                          <div className="text-xs text-gray-500">{m.desc}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">BBD ${m.price.toFixed(2)}</div>
                          <div className="mt-2"><button onClick={()=>removeItem(p.id,m.id)} className="px-2 py-1 border rounded">Remove</button></div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-3">
                      <button onClick={()=>addItem(p.id)} className="px-3 py-2 border rounded">Add Item</button>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
        <div className="mt-6 text-sm text-gray-600">Note: this admin stores edits in your browser's local storage for demo/testing. No server changes are made.</div>
      </main>
    </div>
  )
}
