import React from 'react'
export default function Header({ cartCount, onCartClick }){
  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center">
        <div>
          <div className="text-xl font-bold">BimBites</div>
          <div className="text-sm text-gray-500">Barbados • Delivery & Pickup</div>
        </div>
        <div className="ml-auto">
          <button onClick={onCartClick} className="px-3 py-2 border rounded">🛒 <span className="ml-2">{cartCount}</span></button>
        </div>
      </div>
    </header>
  )
}
