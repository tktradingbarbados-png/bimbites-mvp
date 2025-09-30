import React, { useState } from 'react'
import { CONFIG } from '../data/partners'

export default function Admin() {
  const [partners, setPartners] = useState(CONFIG.partners)

  const addPartner = () => {
    const name = prompt('Enter new partner name:')
    if (!name) return
    setPartners([...partners, { id: name.toLowerCase(), name, image: '', menu: [] }])
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <button
        onClick={addPartner}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Partner
      </button>
      <ul>
        {partners.map((p) => (
          <li key={p.id} className="mb-2">
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  )
}