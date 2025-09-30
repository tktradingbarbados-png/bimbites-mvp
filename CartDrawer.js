import React from 'react'

export default function CartDrawer({ open, onClose, cart, onRemove, whatsappTarget }) {
  if (!open) return null

  const total = cart.reduce((sum, item) => sum + item.price, 0)
  const message = encodeURIComponent(
    'Order from BimBites:\n' +
      cart.map((c) => `- ${c.name} (${c.restaurantName})`).join('\n') +
      `\nTotal: $${total} BDS`
  )
  const whatsappLink = `https://wa.me/${whatsappTarget}?text=${message}`

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
      <div className="bg-white w-80 h-full p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        <ul className="flex-1 overflow-y-auto">
          {cart.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center py-2 border-b">
              <span>{item.name}</span>
              <button
                onClick={() => onRemove(idx)}
                className="text-red-500 text-xs"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <p className="font-semibold">Total: ${total} BDS</p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-green-600 text-white py-2 rounded mt-2"
          >
            Checkout on WhatsApp
          </a>
          <button
            onClick={onClose}
            className="block w-full text-center bg-gray-300 text-black py-2 rounded mt-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}