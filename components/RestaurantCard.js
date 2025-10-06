import React from 'react';

export default function RestaurantCard({ data, onOpen, onAdd }) {
  // ✅ safety check
  if (!data) {
    console.warn('RestaurantCard: data is missing');
    return null;
  }

  const { id, name, banner, cuisine, eta, distanceKm, rating, menu } = data;

  // ✅ handle missing image gracefully
  const imageSrc = banner || '/placeholder.jpg';

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onOpen && onOpen(id)}
    >
      <img
        src={imageSrc}
        alt={name}
        className="w-full h-40 object-cover"
        onError={(e) => {
          e.target.src = '/placeholder.jpg';
        }}
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-500">{cuisine}</p>

        <div className="flex justify-between text-sm mt-2 text-gray-600">
          <span>{eta} min</span>
          <span>{distanceKm} km</span>
          <span>⭐ {rating}</span>
        </div>

        {menu && (
          <div className="mt-3">
            {menu.map((item) => (
              <div key={item.id} className="flex justify-between text-sm py-1 border-b">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onAdd && menu?.[0]) onAdd(menu[0], data);
          }}
          className="mt-3 w-full bg-yellow-400 text-white py-2 rounded hover:bg-yellow-500 transition"
        >
          Add Sample Item
        </button>
      </div>
    </div>
  );
}
