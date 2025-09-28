import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import RestaurantCard from '../components/RestaurantCard'
import CartDrawer from '../components/CartDrawer'

export default function Home(){
  const [config, setConfig] = useState(null);
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(()=>{
    fetch('/api/config').then(r=>r.json()).then(setConfig).catch(()=>setConfig({partners:[], whatsappTarget:''}));
  },[]);
  if(!config) return <div className="p-8">Loading…</div>;
  const partners = config.partners || [];
  const filtered = partners.map(p=>({...p, menu: p.menu.filter(m=>m.name.toLowerCase().includes(query.toLowerCase()))})).filter(p=>p.name.toLowerCase().includes(query.toLowerCase()) || p.menu.length);
  const onOpen = (id)=> setOpenId(id);
  const onAdd = (item, rest) => { setCart(c=>[...c, {...item, restaurantId:rest.id, restaurantName:rest.name}]); }
  const onRemove = idx => setCart(c=>{ const copy=[...c]; copy.splice(idx,1); return copy; });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cart.length} onCartClick={()=>setShowCart(true)} />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="mb-4">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search restaurants, dishes…" className="w-full p-3 rounded border" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map(r=> (
            <div key={r.id}>
              <RestaurantCard r={r} onOpen={onOpen} />
              {openId===r.id && (
                <div className="mt-3 bg-white p-3 rounded shadow">
                  {r.menu.map(item=> (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b">
                      <div>
                        <div className="font-medium">{item.name} {item.badge && <span className="ml-2 text-xs px-2 py-1 bg-yellow-100 rounded">{item.badge}</span>}</div>
                        <div className="text-sm text-gray-500">{item.desc}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">BBD ${item.price.toFixed(2)}</div>
                        <button onClick={()=>onAdd(item, r)} className="mt-2 px-3 py-1 border rounded">Add</button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-3 text-right"><button onClick={()=>setOpenId(null)} className="px-3 py-1 border rounded">Close</button></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <CartDrawer open={showCart} cart={cart} onClose={()=>setShowCart(false)} onRemove={onRemove} whatsappTarget={config.whatsappTarget} />
      <footer className="text-center p-6 text-gray-500">© {new Date().getFullYear()} BimBites — MVP</footer>
    </div>
  )
}
