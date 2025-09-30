import React from 'react'

export default function RestaurantCard({ restaurant, openId, setOpenId, onAdd }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <img src={restaurant.image} alt={restaurant.name} className="w-full h-32 object-cover rounded" />
      <h2 className="text-lg font-semibold mt-2">{restaurant.name}</h2>
      <button
        onClick={() => setOpenId(openId === restaurant.id ? null : restaurant.id)}
        className="text-sm text-blue-500 mt-2"
      >
        {openId === restaurant.id ? 'Hide Menu' : 'View Menu'}
      </button>
      {openId === restaurant.id && (
        <ul className="mt-2">
          {restaurant.menu.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center py-1">
              <span>{item.name} - ${item.price} BDS</span>
              <button
                onClick={() => onAdd(item)}
                className="px-2 py-1 bg-green-500 text-white text-xs rounded"
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}