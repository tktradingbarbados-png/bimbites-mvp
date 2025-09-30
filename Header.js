import React from 'react'

export default function Header({ cartCount, onCartClick }) {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">BimBites</h1>
      <button
        onClick={onCartClick}
        className="relative px-4 py-2 bg-green-600 text-white rounded"
      >
        Cart
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
            {cartCount}
          </span>
        )}
      </button>
    </header>
  )
}