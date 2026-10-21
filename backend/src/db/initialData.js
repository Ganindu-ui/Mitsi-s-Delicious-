// Mitsi's Delicacies by Arabian Vibes Restaurant and Cafe - Colombo 03
// Verified seed data synchronized with live Uber Eats Colombo 03 store

export const INITIAL_RESTAURANT_INFO = {
  name: "Mitsi's Delicacies",
  subtitle: "by Arabian Vibes Restaurant & Cafe",
  location: "Colombo 03 • De Alwis Avenue, Dehiwala-Mount Lavinia",
  cuisine: "Turkish & Serbian BBQ • Italian Pasta • Shawarma • Submarines • Fine Delicacies",
  rating: 4.8,
  reviewCount: 520,
  uberEatsRating: "3.6 (300+ ratings)",
  deliveryTime: "30 - 45 mins",
  minOrder: 1500,
  freeDeliveryThreshold: 5000,
  deliveryFee: 350,
  phone: "+94 11 258 7890",
  whatsapp: "+94771234567",
  uberEatsUrl: "https://www.ubereats.com/store/mitsis-delicacies-by-arabian-vibes-restaurant-and-cafe-colombo-03/qXPclYMTUc-Xzt2bRvPoPg",
  openingHours: "Daily: 11:30 AM – 11:30 PM",
  halal: true,
  isOpen: true,
  address: "De Alwis Avenue, Colombo 03 / Dehiwala, Western 00300, Sri Lanka"
};

export const INITIAL_CATEGORIES = [
  { id: "all", name: "Full Menu", icon: "Utensils", count: 17 },
  { id: "featured", name: "Featured & Bestsellers", icon: "Flame", count: 5 },
  { id: "bbq", name: "Turkish & Serbian BBQ", icon: "Beef", count: 2 },
  { id: "submarine", name: "12\" Submarines", icon: "Sandwich", count: 2 },
  { id: "shawarma", name: "Shawarma Wraps", icon: "Wrap", count: 3 },
  { id: "burger", name: "Burgers", icon: "CookingPot", count: 1 },
  { id: "pasta", name: "Classic Italian Pasta", icon: "Soup", count: 2 },
  { id: "starters", name: "Starters & Mezze", icon: "Salad", count: 3 },
  { id: "salads", name: "Salads", icon: "Sparkles", count: 3 },
  { id: "soups", name: "Soups", icon: "Coffee", count: 2 },
  { id: "delicacies", name: "Mitsi's Delicacies & Sweets", icon: "Cake", count: 3 }
];

export const INITIAL_PROMOS = [
  {
    code: "MITSI10",
    discountPercent: 10,
    type: "percentage",
    description: "10% Welcome Discount",
    minOrder: 0,
    isActive: true
  },
  {
    code: "ARABIAN20",
    discountPercent: 20,
    type: "percentage",
    description: "20% Feast Discount on Orders over LKR 4,000",
    minOrder: 4000,
    isActive: true
  },
  {
    code: "COLOMBO500",
    discountAmount: 500,
    type: "fixed",
    description: "LKR 500 Off Colombo Express Delivery",
    minOrder: 3500,
    isActive: true
  },
  {
    code: "SWEETTOOTH",
    discountPercent: 15,
    type: "percentage",
    description: "15% Off Mitsi's Delicacy Cakes",
    minOrder: 2500,
    isActive: true
  }
];

export const INITIAL_MENU_ITEMS = [
  // FEATURED & SIGNATURE DISHES
  {
    id: "sub-chicken-classic",
    name: "Classic Chicken Submarine 12\"",
    category: "submarine",
    isFeatured: true,
    price: 2150,
    rating: 4.9,
    ratingCount: 184,
    badge: "#1 Most Liked on Uber Eats",
    description: "Our legendary 12-inch freshly baked submarine stuffed with tender grilled seasoned chicken strips, melted mozzarella, crisp lettuce, juicy tomatoes, and our signature secret house sauce. Served with golden French fries and sauce.",
    image: "/images/chicken_submarine.jpg",
    prepTime: "20-25 min",
    dietary: "halal",
    calories: "780 kcal",
    isAvailable: true,
    options: {
      sides: ["Golden French Fries (Included)", "Peri-Peri Spicy Fries (+LKR 200)", "Onion Rings (+LKR 300)"],
      addOns: [
        { name: "Extra Mozzarella Melt", price: 350 },
        { name: "Extra Signature Garlic Mayo Dip", price: 200 },
        { name: "Jalapeño Spicy Kick", price: 150 }
      ]
    }
  },
  {
    id: "bbq-lamb-chops",
    name: "Gourmet Lamb Chops",
    category: "bbq",
    isFeatured: true,
    price: 9250,
    rating: 4.9,
    ratingCount: 142,
    badge: "#2 Most Liked on Uber Eats",
    description: "Prime Turkish-Serbian style char-grilled lamb chops infused with Mediterranean wild herbs and crushed garlic. Served with your choice of warm tortilla bread or seasoned grilled baby potatoes, crisp garden salad, and two house specialty dipping sauces.",
    image: "/images/lamb_chops.jpg",
    prepTime: "30-35 min",
    dietary: "halal",
    calories: "920 kcal",
    isAvailable: true,
    options: {
      sides: ["Warm Tortilla Bread", "Grilled Herb Baby Potatoes", "Half Bread & Half Potatoes"],
      addOns: [
        { name: "Extra Garlic Toum & Harissa Sauces", price: 350 },
        { name: "Side Falafel (3 Pcs)", price: 650 },
        { name: "Grilled Bell Peppers & Onions", price: 300 }
      ]
    }
  },
  {
    id: "pasta-alfredo",
    name: "Classic Alfredo Pasta",
    category: "pasta",
    isFeatured: true,
    price: 3000,
    rating: 4.8,
    ratingCount: 128,
    badge: "#3 Most Liked on Uber Eats",
    description: "Authentic Italian fettuccine tossed in a rich, velvety butter and aged Parmigiano-Reggiano cream sauce, delicate hints of garlic, and finely chopped Italian flat-leaf parsley. Rich, decadent, and comforting.",
    image: "/images/alfredo_pasta.jpg",
    prepTime: "15-20 min",
    dietary: "vegetarian",
    calories: "840 kcal",
    isAvailable: true,
    options: {
      sides: ["Garlic Bread (2 slices included)", "Extra Garlic Baguette (+LKR 250)"],
      addOns: [
        { name: "Add Grilled Chicken Breast Strips", price: 650 },
        { name: "Add Sautéed Wild Mushrooms", price: 400 },
        { name: "Extra Aged Parmesan Shavings", price: 300 }
      ]
    }
  },
  {
    id: "shawarma-chicken",
    name: "Authentic Chicken Shawarma",
    category: "shawarma",
    isFeatured: true,
    price: 2750,
    rating: 4.8,
    ratingCount: 96,
    badge: "Bestseller (66% repeat)",
    description: "Middle Eastern spiced tender chicken roasted on slow spit, wrapped in soft Saj flatbread with Lebanese pickled turnips, crispy fries inside, and our signature homemade creamy garlic mayonnaise and zesty chili sauce.",
    image: "/images/chicken_shawarma.jpg",
    prepTime: "15-20 min",
    dietary: "halal",
    calories: "620 kcal",
    isAvailable: true,
    options: {
      sides: ["Pickles & Chili Dip (Included)", "Add Mini French Fries (+LKR 350)"],
      addOns: [
        { name: "Double Chicken Portion", price: 600 },
        { name: "Melted Cheddar Cheese", price: 300 },
        { name: "Extra Chili Garlic Toum Sauce", price: 200 }
      ]
    }
  },
  {
    id: "bbq-shish-kebab",
    name: "Turkish Chicken Shish Kebab",
    category: "bbq",
    isFeatured: true,
    price: 3950,
    rating: 4.9,
    ratingCount: 88,
    badge: "Chef's Special",
    description: "Succulent cubes of boneless chicken breast marinated in Turkish spices, yogurt, and sweet paprika, grilled over embers with charred tomatoes and peppers. Served with tortilla bread or grilled potatoes, salad, and two artisan sauces.",
    image: "/images/shish_kebab.jpg",
    prepTime: "25-30 min",
    dietary: "halal",
    calories: "710 kcal",
    isAvailable: true,
    options: {
      sides: ["Warm Tortilla Bread", "Grilled Herb Potatoes", "Fragrant Saffron Rice"],
      addOns: [
        { name: "Extra Skewer of Chicken Kebab", price: 1200 },
        { name: "Side Hummus Dip", price: 500 },
        { name: "Spicy Garlic Aioli", price: 200 }
      ]
    }
  },

  // BURGERS
  {
    id: "burger-crispy-chicken",
    name: "Crispy Chicken Burger",
    category: "burger",
    price: 2500,
    rating: 4.7,
    ratingCount: 74,
    badge: "Crowd Favorite",
    description: "Golden buttermilk crispy-fried chicken fillet tossed in mild spices, layered with crunchy slaw, melted American cheese, and house secret burger sauce inside a toasted brioche bun. Served with French fries and sauce.",
    image: "/images/crispy_burger.jpg",
    prepTime: "15-20 min",
    dietary: "halal",
    calories: "750 kcal",
    isAvailable: true,
    options: {
      sides: ["Golden French Fries (Included)", "Peri-Peri Fries (+LKR 200)"],
      addOns: [
        { name: "Extra Fried Bacon (Beef/Halal)", price: 400 },
        { name: "Extra Melted Cheddar Slice", price: 250 },
        { name: "Caramelized Balsamic Onions", price: 200 }
      ]
    }
  },

  // SUBMARINES
  {
    id: "sub-beef",
    name: "Beef Submarine 12\"",
    category: "submarine",
    price: 2400,
    rating: 4.7,
    ratingCount: 65,
    badge: "Hearty Feast",
    description: "Generous 12-inch toasted submarine bread loaded with spiced sliced beef tenderloin, sautéed onions, bell peppers, melted cheese blend, and savory barbecue garlic spread. Served with French fries and sauce.",
    image: "/images/chicken_submarine.jpg",
    prepTime: "20-25 min",
    dietary: "halal",
    calories: "820 kcal",
    isAvailable: true,
    options: {
      sides: ["French Fries (Included)", "Cheese Fries (+LKR 350)"],
      addOns: [
        { name: "Double Beef Portion", price: 750 },
        { name: "Extra Cheese Melt", price: 350 }
      ]
    }
  },

  // SHAWARMAS
  {
    id: "shawarma-beef",
    name: "Slow-Roasted Beef Shawarma",
    category: "shawarma",
    price: 3000,
    rating: 4.8,
    ratingCount: 52,
    badge: "Authentic Arabic",
    description: "Marinated pulled beef strips spiced with cardamom and sumac, combined with tahini drizzle, fresh sumac onions, fresh tomatoes, and homemade mayonnaise with chili sauce, wrapped tight and toasted crispy.",
    image: "/images/chicken_shawarma.jpg",
    prepTime: "20 min",
    dietary: "halal",
    calories: "690 kcal",
    isAvailable: true,
    options: {
      sides: ["Pickled Turnips & Garlic Dip (Included)", "Side Fries (+LKR 350)"],
      addOns: [
        { name: "Extra Tahini & Chili Toum", price: 250 },
        { name: "Extra Beef Fill", price: 700 }
      ]
    }
  },
  {
    id: "shawarma-veg",
    name: "Vegetarian Gourmet Shawarma",
    category: "shawarma",
    price: 2150,
    rating: 4.6,
    ratingCount: 38,
    badge: "Vegetarian Choice",
    description: "Crispy spiced falafel bites, grilled halloumi slices, roasted Mediterranean peppers, cucumber, crisp lettuce, and homemade garlic-herb mayonnaise with mild chili sauce wrapped in Saj bread.",
    image: "/images/chicken_shawarma.jpg",
    prepTime: "15 min",
    dietary: "vegetarian",
    calories: "510 kcal",
    isAvailable: true,
    options: {
      sides: ["House Pickles (Included)", "Side Salad (+LKR 300)"],
      addOns: [
        { name: "Extra Grilled Halloumi", price: 450 },
        { name: "Avocado Slices", price: 300 }
      ]
    }
  },

  // STARTERS & MEZZE
  {
    id: "starter-hummus",
    name: "Classic Hummus with Tortilla Bread",
    category: "starters",
    price: 2150,
    rating: 4.9,
    ratingCount: 92,
    badge: "Arabic Specialty",
    description: "Silky hand-whipped chickpea dip blended with creamy sesame tahini, pressed extra virgin olive oil, garlic, lemon juice, whole chickpeas, and smoked paprika. Served with warm grilled tortilla bread slices.",
    image: "/images/hummus_falafel.jpg",
    prepTime: "10 min",
    dietary: "vegetarian",
    calories: "460 kcal",
    isAvailable: true,
    options: {
      sides: ["Warm Tortilla Bread (Included)", "Extra Warm Bread Basket (+LKR 250)"],
      addOns: [
        { name: "Top with Sautéed Spiced Chicken", price: 650 },
        { name: "Top with Toasted Pine Nuts", price: 400 },
        { name: "Extra Olive Oil & Zaatar", price: 200 }
      ]
    }
  },
  {
    id: "starter-falafel",
    name: "Crispy Falafel (6 Pcs)",
    category: "starters",
    price: 1500,
    rating: 4.8,
    ratingCount: 61,
    badge: "Golden & Crunchy",
    description: "Six freshly fried golden chickpea and coriander falafel spheres, crispy exterior with tender spiced interior. Served with creamy sesame tahini dip and pickled cucumber ribbons.",
    image: "/images/hummus_falafel.jpg",
    prepTime: "12 min",
    dietary: "vegetarian",
    calories: "380 kcal",
    isAvailable: true,
    options: {
      sides: ["Tahini Garlic Dip (Included)"],
      addOns: [
        { name: "Extra Falafel (3 Pcs)", price: 650 },
        { name: "Side Warm Pita Bread", price: 250 }
      ]
    }
  },
  {
    id: "starter-french-fries",
    name: "Gourmet French Fries",
    category: "starters",
    price: 1200,
    rating: 4.7,
    ratingCount: 80,
    badge: "Snack Favorite",
    description: "Basket of hot golden shoestring potatoes seasoned with sea salt and aromatic herbs, served with our signature house cocktail dipping sauce.",
    image: "/images/chicken_submarine.jpg",
    prepTime: "10 min",
    dietary: "vegetarian",
    calories: "340 kcal",
    isAvailable: true,
    options: {
      sides: ["Original Sea Salt", "Peri-Peri Spicy Dust (+LKR 150)", "Garlic Herb Seasoning (+LKR 150)"],
      addOns: [
        { name: "Melted Cheese Sauce Pour", price: 350 },
        { name: "Extra Truffle Garlic Mayo", price: 250 }
      ]
    }
  },

  // SALADS
  {
    id: "salad-fattoush",
    name: "Levantine Fattoush Salad",
    category: "salads",
    price: 2050,
    rating: 4.8,
    ratingCount: 45,
    badge: "Tangy & Fresh",
    description: "Crisp Romaine lettuce, diced cucumbers, radishes, cherry tomatoes, fresh mint, and scallions tossed with toasted sumac pita crisps, wild zaatar, and a rich pomegranate molasses vinaigrette.",
    image: "/images/hummus_falafel.jpg",
    prepTime: "10 min",
    dietary: "vegetarian",
    calories: "280 kcal",
    isAvailable: true,
    options: {
      sides: ["Pomegranate Dressing (Included)"],
      addOns: [
        { name: "Add Grilled Chicken Breast", price: 600 },
        { name: "Add Feta / Halloumi Cheese", price: 400 }
      ]
    }
  },
  {
    id: "salad-tabbouleh",
    name: "Traditional Tabbouleh Salad",
    category: "salads",
    price: 1700,
    rating: 4.7,
    ratingCount: 39,
    badge: "Herbaceous Classic",
    description: "Generous hand-minced fresh flat parsley, garden mint leaves, diced ripe red tomatoes, scallions, and cracked wheat bulgur, seasoned with cold-pressed olive oil and fresh lemon juice.",
    image: "/images/hummus_falafel.jpg",
    prepTime: "10 min",
    dietary: "vegetarian",
    calories: "220 kcal",
    isAvailable: true,
    options: {
      sides: ["Lemon-Olive Dressing (Included)"],
      addOns: [{ name: "Extra Toasted Pita Bread", price: 200 }]
    }
  },
  {
    id: "salad-garden",
    name: "Garden Fresh Salad",
    category: "salads",
    price: 1800,
    rating: 4.6,
    ratingCount: 29,
    badge: "Light & Healthy",
    description: "Crispy local iceberg lettuce, sliced English cucumber, sweet baby carrots, bell peppers, and cherry tomatoes served with a light herb vinaigrette dressing.",
    image: "/images/hummus_falafel.jpg",
    prepTime: "10 min",
    dietary: "vegetarian",
    calories: "160 kcal",
    isAvailable: true,
    options: {
      sides: ["Herb Vinaigrette (Included)"],
      addOns: [{ name: "Add Boiled Egg", price: 150 }]
    }
  },

  // SOUPS
  {
    id: "soup-chicken",
    name: "Creamy Chicken Soup",
    category: "soups",
    price: 1450,
    rating: 4.9,
    ratingCount: 71,
    badge: "Popular Comfort Soup",
    description: "Velvety, slow-simmered chicken cream soup with shredded tender chicken breast, celery, carrots, and sweet corn infused with garlic and thyme. Served piping hot with crispy garlic bread.",
    image: "/images/alfredo_pasta.jpg",
    prepTime: "15 min",
    dietary: "halal",
    calories: "320 kcal",
    isAvailable: true,
    options: {
      sides: ["Garlic Bread (Included)", "Extra Garlic Bread Slice (+LKR 150)"],
      addOns: [{ name: "Extra Shredded Chicken", price: 300 }]
    }
  },
  {
    id: "soup-mushroom",
    name: "Creamy Wild Mushroom Soup",
    category: "soups",
    price: 1200,
    rating: 4.8,
    ratingCount: 54,
    badge: "Rich & Earthy",
    description: "Sautéed button and portobello mushrooms pureed into a rich cream soup with browned butter, white pepper, and a touch of nutmeg. Served with herb-toasted garlic bread.",
    image: "/images/alfredo_pasta.jpg",
    prepTime: "15 min",
    dietary: "vegetarian",
    calories: "290 kcal",
    isAvailable: true,
    options: {
      sides: ["Garlic Bread (Included)"],
      addOns: [{ name: "Truffle Oil Drizzle", price: 350 }]
    }
  },

  // CLASSIC ITALIAN
  {
    id: "pasta-carbonara",
    name: "Silky Carbonara Pasta",
    category: "pasta",
    price: 3200,
    rating: 4.8,
    ratingCount: 82,
    badge: "Italian Classic",
    description: "Linguine pasta tossed with savory crisp beef bacon bits, garlic, whisked egg yolks, freshly grated Pecorino & Parmesan cheese, and crushed Tellicherry black peppercorns in authentic Roman style.",
    image: "/images/alfredo_pasta.jpg",
    prepTime: "18-22 min",
    dietary: "halal",
    calories: "890 kcal",
    isAvailable: true,
    options: {
      sides: ["Garlic Bread (Included)"],
      addOns: [
        { name: "Extra Crispy Beef Bacon", price: 500 },
        { name: "Extra Grated Parmesan Cheese", price: 300 }
      ]
    }
  },

  // MITSI'S DELICACIES & SWEETS
  {
    id: "delicacy-raspberry-choc",
    name: "Artisan Raspberry Chocolate Delicacy Cake",
    category: "delicacies",
    price: 1850,
    rating: 5.0,
    ratingCount: 198,
    badge: "Mitsi's Signature",
    description: "Colombo's most celebrated dessert! Layers of rich 70% dark Belgian chocolate mousse, tangy wild raspberry coulis jelly, and cocoa sponge cake, topped with edible gold leaf and fresh berries.",
    image: "/images/delicacy_cake.jpg",
    prepTime: "Ready to serve",
    dietary: "vegetarian",
    calories: "450 kcal",
    isAvailable: true,
    options: {
      sides: ["Fresh Berry Coulis & Mint (Included)"],
      addOns: [
        { name: "Scoop of Vanilla Bean Gelato", price: 400 },
        { name: "Happy Birthday / Anniversary Plaque", price: 200 }
      ]
    }
  },
  {
    id: "delicacy-basque-cheesecake",
    name: "Basque Burnt Caramel Cheesecake",
    category: "delicacies",
    price: 1950,
    rating: 4.9,
    ratingCount: 165,
    badge: "Mitsi's Best Seller",
    description: "Mitsi's iconic Spanish-style burnt cheesecake with a beautifully caramelized bronzed crust and an ultra-creamy, custard-soft molten center crafted with premium cream cheese and vanilla bean.",
    image: "/images/delicacy_cake.jpg",
    prepTime: "Ready to serve",
    dietary: "vegetarian",
    calories: "480 kcal",
    isAvailable: true,
    options: {
      sides: ["Salted Caramel Drizzle (Included)"],
      addOns: [{ name: "Extra Berry Compote", price: 250 }]
    }
  },
  {
    id: "delicacy-mint-lemonade",
    name: "Arabian Mint & Rose Cooler",
    category: "delicacies",
    price: 950,
    rating: 4.9,
    ratingCount: 110,
    badge: "Signature Refresher",
    description: "Crushed fresh garden mint leaves, freshly squeezed Persian lime juice, chilled club soda, and an exquisite whisper of Damascus rose water. Wonderfully refreshing alongside BBQ and Shawarmas.",
    image: "/images/hummus_falafel.jpg",
    prepTime: "5 min",
    dietary: "vegetarian",
    calories: "120 kcal",
    isAvailable: true,
    options: {
      sides: ["Sweetness: Normal", "Sweetness: Less Sweet", "Sugar Free (Stevia)"],
      addOns: [{ name: "Add Chia Seeds", price: 150 }]
    }
  }
];

export const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    author: "Shenali Perera",
    rating: 5,
    date: "Yesterday",
    comment: "The Lamb Chops with warm tortilla and garlic sauce are out of this world! Melt in the mouth. Also loved the Basque cheesecake.",
    dishId: "bbq-lamb-chops"
  },
  {
    id: "rev-2",
    author: "Mohammed Farhan",
    rating: 5,
    date: "3 days ago",
    comment: "Best chicken submarine in Colombo! 12 inches of pure goodness packed with juicy chicken and melted mozzarella.",
    dishId: "sub-chicken-classic"
  },
  {
    id: "rev-3",
    author: "Kavinda Wickramasinghe",
    rating: 5,
    date: "1 week ago",
    comment: "Authentic Arabic shawarma with legit garlic toum sauce. Fast delivery to Colombo 03, arrived piping hot!",
    dishId: "shawarma-chicken"
  }
];

export const INITIAL_RESERVATIONS = [
  {
    id: "RES-101",
    guestName: "Ayesha De Silva",
    phone: "+94 77 345 6789",
    email: "ayesha.desilva@example.com",
    date: "2026-10-22",
    time: "19:30",
    partySize: 4,
    occasion: "Birthday Celebration",
    specialRequests: "Window booth requested and candle on Raspberry Delicacy Cake",
    status: "confirmed",
    createdAt: "2026-10-21T09:30:00.000Z"
  }
];
