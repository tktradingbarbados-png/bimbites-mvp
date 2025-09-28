import React from 'react'
export default function RestaurantCard({ r, onOpen }){
  return (
    <div className="border rounded overflow-hidden shadow-sm cursor-pointer" onClick={()=>onOpen(r.id)}>
      <img src={r.banner} alt={r.name} className="w-full h-36 object-cover"/>
      <div className="p-3">
        <div className="font-semibold">{r.name}</div>
        <div className="text-sm text-gray-500">{r.cuisine}</div>
        <div className="text-xs text-gray-600 mt-2">⏱ {r.eta}-{r.eta+8} min • 📍 {r.distanceKm} km • ⭐ {r.rating}</div>
      </div>
    </div>
  )
}
