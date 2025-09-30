
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import RestaurantCard from '../components/RestaurantCard';
import CartDrawer from '../components/CartDrawer';

export default function Home() {
  const [config, setConfig] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetch('/api/config')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load config');
        return r.json();
      })
      .then((data) => setConfig(data))
      .catch((err) => {
        console.error(err);
        setError('⚠️ Could not load app configuration. Please try again later.');
      });
  }, []);

  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!config) return <div className="p-8">Loading...</div>;

  const partners = config.partners || [];
  const filtered = partners.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const onOpen = (id) => setOpenId(id);
  const onAdd = (item, rest) =>
    setCart((c) => [...c, { ...item, restaurantId: rest.id, restaurantName: rest.name }]);
  const onRemove = (idx) =>
    setCart((c) => {
      const copy = [...c];
      copy.splice(idx, 1);
      return copy;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cart.length} onCartClick={() => setShowCart(true)} />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search restaurants, dishes..."
            className="w-full p-3 rounded border"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((r) => (
            <div key={r.id}>
              <RestaurantCard
                restaurant={r}
                openId={openId}
                onOpen={onOpen}
                onAdd={onAdd}
              />
            </div>
          ))}
        </div>
      </main>
      <CartDrawer
        open={showCart}
        cart={cart}
        onClose={() => setShowCart(false)}
        onRemove={onRemove}
        whatsappTarget={config.whatsappTarget}
      />
    </div>
  );
}
