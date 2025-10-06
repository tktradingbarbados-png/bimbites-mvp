// pages/menu.jsx
import React, { useState } from 'react';

export default function Menu() {
  // Sample menu items
  const [items] = useState([
    { id: 1, name: 'Milo Cocktail', price: 8 },
    { id: 2, name: 'Fruit Punch', price: 6 },
    { id: 3, name: 'Cocoa Smoothie', price: 7 },
    { id: 4, name: 'Tropical Shake', price: 9 },
  ]);

  // Cart state with quantity
  const [cart, setCart] = useState([]);

  // Add item to cart or increase quantity
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove item or decrease quantity
  const removeFromCart = (itemId) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (!existing) return prev;
      if (existing.quantity === 1) {
        return prev.filter((i) => i.id !== itemId);
      } else {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
    });
  };

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Send order via WhatsApp
  const handleWhatsappOrder = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    const phone = '12462453221'; // Your WhatsApp number
    const message = cart
      .map((item, index) => `${index + 1}. ${item.name} x${item.quantity} - $${item.price * item.quantity}`)
      .join('\n');
    const fullMessage = `Hi, I want to place an order:\n${message}\nTotal: $${total}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Menu</h1>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 border rounded shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <p className="mb-4">Price: ${item.price}</p>
            <button
              onClick={() => addToCart(item)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart */}
      <div className="mt-10 border-t pt-6">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 && <p>Your cart is empty.</p>}
        {cart.length > 0 && (
          <div>
            <ul>
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center mb-3 p-3 border rounded"
                >
                  <div>
                    <span className="font-semibold">{item.name}</span>{' '}
                    x{item.quantity} - ${item.price * item.quantity}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      -
                    </button>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <p className="font-bold text-lg mt-2">Total: ${total}</p>
            <button
              onClick={handleWhatsappOrder}
              className="mt-4 bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600"
            >
              Send Order via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
