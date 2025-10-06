export const CONFIG = {
  whatsappTarget: "12462453221",
  partners: [
    {
      id: 'seafoodshack',
      name: 'Seafood Shack',
      banner: '/images/seafoodshack.jpg',
      cuisine: 'Seafood • Caribbean',
      eta: 25,
      distanceKm: 2.4,
      rating: 4.7,
      menu: [
        { id:'s1', name: 'Garlic Shrimp', desc: 'Pan-fried shrimp with garlic butter and rice', price: 22.00 },
        { id:'s2', name: 'Fried Flying Fish', desc: 'Local flying fish served with peas & rice', price: 18.50 },
        { id:'s3', name: 'Lobster Tail Dinner', desc: 'Grilled lobster tail with garlic butter, sides', price: 65.00 },
        { id:'s4', name: 'Conch Fritters', desc: 'Crispy conch fritters with spicy mayo', price: 10.00 },
        { id:'s5', name: 'Seafood Pasta', desc: 'Pasta with mixed seafood in a tomato cream', price: 28.00 }
      ]
    },
    {
      id: 'mapps',
      name: 'Mapps Rotisserie',
      banner: '/images/mapps.jpg',
      cuisine: 'Rotisserie • Caribbean',
      eta: 18,
      distanceKm: 3.0,
      rating: 4.5,
      menu: [
        { id:'m1', name: 'Quarter Chicken + Fries', desc: 'Herb-roasted quarter chicken with fries', price: 12.00 },
        { id:'m2', name: 'Half Chicken + Sides', desc: 'Half rotisserie chicken with 2 sides', price: 20.00 },
        { id:'m3', name: 'Chicken Salad', desc: 'Mixed greens with rotisserie chicken', price: 11.50 },
        { id:'m4', name: 'BBQ Wings (6)', desc: 'Sticky BBQ wings', price: 9.00 },
        { id:'m5', name: 'Family Pack (4ppl)', desc: 'Whole chicken + fries + sides', price: 48.00 }
      ]
    },
    {
      id: 'littlecaesars',
      name: 'Little Caesars (Barbados)',
      banner: '/images/littlecaesars.jpg',
      cuisine: 'Pizza • Fast Food',
      eta: 30,
      distanceKm: 4.2,
      rating: 4.2,
      menu: [
        { id:'l1', name: 'Large Pepperoni Pizza', desc: 'Classic pepperoni, extra cheese', price: 24.00 },
        { id:'l2', name: 'Cheese Pizza', desc: 'Large cheese pizza', price: 20.00 },
        { id:'l3', name: 'Crazy Breadsticks', desc: 'Garlic breadsticks with dipping sauce', price: 8.00 },
        { id:'l4', name: 'Chicken Wings (8)', desc: 'Crispy wings with choice of sauce', price: 12.00 },
        { id:'l5', name: 'Stuffed Crust Pizza', desc: 'Cheesy stuffed crust', price: 28.00 }
      ]
    },
    {
      id: 'ksroti',
      name: "K's Roti Place (Black Rock)",
      banner: '/images/ksroti.jpg',
      cuisine: 'Barbadian • Roti',
      eta: 20,
      distanceKm: 1.8,
      rating: 4.6,
      menu: [
        { id:'r1', name: 'Chicken Roti', desc: 'Curried chicken wrapped in soft roti', price: 15.00 },
        { id:'r2', name: 'Beef Roti', desc: 'Slow-cooked curried beef', price: 16.00 },
        { id:'r3', name: 'Veggie Roti', desc: 'Seasonal vegetables in curry', price: 12.00 },
        { id:'r4', name: 'Shrimp Roti', desc: 'Curried shrimp with roti', price: 17.00 },
        { id:'r5', name: 'Curry Goat Roti', desc: 'Traditional curry goat', price: 18.00 }
      ]
    },
    {
      id: 'yelluhmeat',
      name: 'Yelluh Meat',
      banner: '/images/yelluhmeat.jpg',
      cuisine: 'Grill • BBQ',
      eta: 22,
      distanceKm: 3.4,
      rating: 4.5,
      menu: [
        { id:'y1', name: 'Pork Chop Plate', desc: 'Grilled pork chop with mac & cheese', price: 20.00 },
        { id:'y2', name: 'Grilled Chicken Plate', desc: 'Served with rice & salad', price: 18.00 },
        { id:'y3', name: 'Fish Plate', desc: 'Fried fish with sides', price: 17.50 },
        { id:'y4', name: 'Ribs Plate', desc: 'Slow-cooked ribs with sauce', price: 28.00 },
        { id:'y5', name: 'Mac Pie & Coleslaw', desc: 'Classic sides', price: 6.50 }
      ]
    },
    {
      id: 'milococktail',
      name: 'Milococktail Pouches',
      banner: '/images/milococktail.jpg',
      cuisine: 'Cocktails • Ready-to-drink',
      eta: 10,
      distanceKm: 2.0,
      rating: 4.8,
      menu: [
        { id:'mi1', name: 'Daiquiri — Strawberry (250ml)', desc: 'Strawberry daiquiri pouch', price: 10.00 },
        { id:'mi2', name: 'Daiquiri — Passionfruit (250ml)', desc: 'Passionfruit daiquiri pouch', price: 10.00 },
        { id:'mi3', name: 'Daiquiri — Mango (250ml)', desc: 'Mango daiquiri pouch', price: 10.00 },
        { id:'mi4', name: 'Daiquiri — Raspberry (250ml)', desc: 'Raspberry daiquiri pouch', price: 10.00 },
        { id:'mi5', name: 'Daiquiri — Peach (250ml)', desc: 'Peach daiquiri pouch', price: 10.00 },
        { id:'mi6', name: 'Daiquiri — Guava (250ml)', desc: 'Guava daiquiri pouch', price: 10.00 },
        { id:'mi7', name: 'Daiquiri — Golden Apple (250ml)', desc: 'Golden apple daiquiri pouch', price: 10.00 },
        { id:'mi8', name: 'Whiskey Sour (250ml)', desc: 'Whiskey sour pouch', price: 15.00 },
        { id:'mi9', name: 'Rum Punch (250ml)', desc: 'Classic rum punch pouch', price: 10.00 },
        { id:'mi10', name: 'Margarita (250ml)', desc: 'Classic margarita pouch', price: 12.00 },
        { id:'mi11', name: 'Custom Mix (250ml)', desc: 'Create your own mix', price: 10.00 },
        { id:'mi12', name: 'Any Flavor (100ml)', desc: 'Small 100ml pouch (any flavor)', price: 7.00 }
  ]
}

    }
  ]
};
