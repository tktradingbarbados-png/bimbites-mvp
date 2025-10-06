import React from 'react'
export default function CartDrawer({ open, cart, onClose, onRemove, whatsappTarget }){
  const subtotal = cart.reduce((s,i)=>s+i.price,0);
  const delivery = cart.length>0 ? Math.max(5, Math.round(cart.length*1.5)) : 0;
  const service = +(subtotal*0.05).toFixed(2);
  const total = subtotal + delivery + service;
  if(!open) return null;
  const currency = (n) => `BBD $${n.toFixed(2)}`;
  const onCheckout = ()=>{
    const byRest = cart.reduce((acc,i)=>{ (acc[i.restaurantName] ||= []).push(i); return acc; }, {});
    const lines = [
      `🛵 *New Delivery Order* – BimBites`,
      ...Object.entries(byRest).map(([rest, items]) => {
        const itemsLines = items.map(i=>`• ${i.name} – ${currency(i.price)}`).join("\n");
        return `\n*${rest}*\n${itemsLines}`;
      }),
      "\n---",
      `Subtotal: ${currency(subtotal)}`,
      `Service (5%): ${currency(service)}`,
      `Delivery: ${currency(delivery)}`,
      `Total: *${currency(total)}*`,
      "\n📍 Send your delivery location (pin) & phone number:",
      "Name:",
      "Location:",
      "Phone:",
      "Notes:"
    ].join("\n");
    const url = `https://wa.me/${whatsappTarget}?text=${encodeURIComponent(lines)}`;
    window.location.href = url;
  }
  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex justify-end">
      <div className="w-full sm:w-96 bg-white h-full p-4 overflow-auto">
        <div className="flex items-center mb-3">
          <div className="font-semibold text-lg">Your Cart</div>
          <div className="ml-auto"><button onClick={onClose} className="px-3 py-1 border rounded">Close</button></div>
        </div>
        <div>
          {cart.length===0 ? (
            <div className="text-center text-gray-500 py-10">Your cart is empty.</div>
          ) : (
            cart.map((i,idx)=> (
              <div key={idx} className="flex items-start gap-3 py-2 border-b">
                <div className="flex-1">
                  <div className="font-medium">{i.name}</div>
                  <div className="text-xs text-gray-500">{i.restaurantName}</div>
                  <div className="font-semibold mt-1">BBD ${i.price.toFixed(2)}</div>
                </div>
                <div><button onClick={()=>onRemove(idx)} className="px-2 py-1 border rounded">Remove</button></div>
            ))
          )}
        </div>
        <div className="mt-4 border-t pt-3">
          <div className="flex justify-between text-sm mb-1"><span>Subtotal</span><span>{`BBD $${subtotal.toFixed(2)}`}</span></div>
          <div className="flex justify-between text-sm mb-1"><span>Service (5%)</span><span>{`BBD $${service.toFixed(2)}`}</span></div>
          <div className="flex justify-between text-sm mb-3"><span>Delivery est.</span><span>{`BBD $${delivery.toFixed(2)}`}</span></div>
          <div className="flex justify-between font-bold text-lg mb-3"><span>Total</span><span>{`BBD $${total.toFixed(2)}`}</span></div>
          <button onClick={onCheckout} className="w-full px-4 py-2 bg-black text-white rounded">Checkout via WhatsApp</button>
        </div>
      </div>
    </div>
  )
}
