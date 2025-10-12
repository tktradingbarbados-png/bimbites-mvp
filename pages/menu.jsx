import React, { useState } from "react";

export default function MenuPage() {
  // Sample partners + menu items
  const partners = [
    {
      id: 1,
      name: "Milo Cocktails",
      items: [
        { id: 1, name: "Classic Milo Shake", price: 10 },
        { id: 2, name: "Peanut Punch", price: 12 },
        { id: 3, name: "Milo Mocha Blend", price: 14 },
      ],
    },
    {
      id: 2,
      name: "Bimbites Kitchen",
      items: [
        { id: 4, name: "BBQ Wings", price: 18 },
        { id: 5, name: "Loaded Fries", price: 15 },
        { id: 6, name: "Tropical Smoothie", price: 13 },
      ],
    },
  ];

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");

  // Add item to cart
  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  // Total
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  // WhatsApp checkout
  const checkout = () => {
    const orderText = cart
      .map((i) => `${i.name} x${i.qty} - $${i.price * i.qty}`)
      .join("%0A");
    const message = `Hello! I’d like to place an order:%0A${orderText}%0A%0ATotal: $${total}`;
    const url = `https://wa.me/12462453221?text=${message}`; // Replace with your business WhatsApp number
    window.open(url, "_blank");
  };

  // Search filter
  const filteredPartners = partners.map((p) => ({
    ...p,
    items: p.items.filter((i) =>
      i.name.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">BimBites Menu</h1>

      <input
        type="text"
        placeholder="Search items..."
        className="border p-2 w-full mb-4 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredPartners.map((partner) => (
        <div key={partner.id} className="mb-6 border-b pb-4">
          <h2 className="text-xl font-semibold mb-2">{partner.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {partner.items.length > 0 ? (
              partner.items.map((item) => (
                <div
                  key={item.id}
                  className="border p-3 rounded shadow hover:shadow-md transition"
                >
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-500">${item.price}</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-green-600 text-white px-3 py-1 rounded mt-2 hover:bg-green-700"
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">No items found</p>
            )}
          </div>
        </div>
      ))}

      {/* Cart button */}
      <button
        onClick={() => setShowCart(true)}
        className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
      >
        View Cart ({cart.length})
      </button>

      {/* Cart modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowCart(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-3">Your Cart</h2>

            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                <ul className="space-y-2 mb-4">
                  {cart.map((item) => (
                    <li key={item.id} className="flex justify-between items-center">
                      <span>
                        {item.name} x{item.qty}
                      </span>
                      <div className="flex items-center gap-2">
                        <span>${item.price * item.qty}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="font-semibold mb-3">
                  Total: ${total.toFixed(2)}
                </div>

                <button
                  onClick={checkout}
                  className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
                >
                  Checkout with WhatsApp
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
