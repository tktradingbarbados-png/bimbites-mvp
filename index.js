import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import RestaurantCard from '../components/RestaurantCard'
import CartDrawer from '../components/CartDrawer'
import '../styles/globals.css'

export default function Home() {
  const [config, setConfig] = useState(null)
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState(null)
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    fetch('/api/config')
      .then((r) => r.json())
      .then((data) => setConfig(data))
      .catch(() => setConfig({ partners: [], whatsappTarget: '' }))
  }, [])

  if (!config) return <div className="p-8">Loading...</div>

  const partners = config.partners || []
  const filtered = partners.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  const onAdd = (item, rest) => {
    setCart((c) => [...c, { ...item, restaurantId: rest.id, restaurantName: rest.name }])
  }
  const onRemove = (idx) => {
    setCart((c) => {
      const copy = [...c]
      copy.splice(idx, 1)
      return copy
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cart.length} onCartClick={() => setShowCart(true)} />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search restaurants, dishes…"
            className="w-full p-3 rounded border"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((r) => (
            <div key={r.id}>
              <RestaurantCard
                restaurant={r}
                openId={openId}
                setOpenId={setOpenId}
                onAdd={(item) => onAdd(item, r)}
              />
            </div>
          ))}
        </div>
      </main>
      <CartDrawer
        open={showCart}
        onClose={() => setShowCart(false)}
        cart={cart}
        onRemove={onRemove}
        whatsappTarget={config.whatsappTarget}
      />
    </div>
  )
}