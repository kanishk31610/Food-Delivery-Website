// PIZZA PAGE
exports.getPizza = (req, res) => {
    res.render('pizza', {
        title: "Subway",

        restaurant: {
            name: "Subway",
            diningRating: 3.9,
            deliveryRating: 4.1,
            description: "Healthy Food, Salad, Fast Food",
            banner1: "https://cdn.sanity.io/images/kts928pd/production/d46e9751ab0c6e97a5f8d63fa4020492af4c5381.png",
            banner2: "https://b.zmtcdn.com/data/pictures/chains/5/120285/3679c0c7694e0c06c6d446a56046a95a.jpg"
        },

        menu: [
            {
                name: "Paneer Pizza",
                price: 299,
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
            description: "Loaded with paneer cubes and cheese"
          },
          {
            name: "Margherita Pizza",
            price: 249,
            image: "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?auto=format&fit=crop&w=1200&q=80",
            description: "Classic cheese and tomato base"
          },
          {
            name: "Farmhouse Pizza",
            price: 349,
            image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=80",
            description: "Mushroom, capsicum, onion and olives"
          },
          {
            name: "Veggie Delight",
            price: 319,
            image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=80",
            description: "Fresh veggies with mozzarella topping"
          },
          {
            name: "Cheese Burst",
            price: 389,
            image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1200&q=80",
            description: "Extra melted cheese in every bite"
          },
          {
            name: "Mexican Green Wave",
            price: 359,
            image: "https://images.unsplash.com/photo-1600628422019-f60cd59d8d26?auto=format&fit=crop&w=1200&q=80",
            description: "Spicy jalapeno, onion and herbs"
          },
          {
            name: "Tandoori Paneer",
            price: 419,
            image: "https://images.unsplash.com/photo-1620374645498-af6bd681a0bd?auto=format&fit=crop&w=1200&q=80",
            description: "Smoky tandoori paneer and capsicum"
            }
        ]
    });
};

// BURGER PAGE
exports.getBurger = (req, res) => {
  res.render('burger', {
    title: 'Burger King Menu',
    restaurant: {
      name: 'Burger Junction',
      diningRating: 4.0,
      deliveryRating: 4.3,
      description: 'Juicy burgers, loaded fries and cool shakes',
      banner1: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1400&q=80'
    },
    menu: [
      { name: 'Classic Veg Burger', price: 149, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80', description: 'Crispy patty with fresh veggies' },
      { name: 'Cheese Blast Burger', price: 179, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1200&q=80', description: 'Double cheese melt with soft bun' },
      { name: 'Paneer Tikka Burger', price: 199, image: 'https://images.unsplash.com/photo-1610970878459-a0e464d7592b?auto=format&fit=crop&w=1200&q=80', description: 'Smoky paneer tikka patty burger' },
      { name: 'Aloo Crunch Burger', price: 129, image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=1200&q=80', description: 'Crunchy potato patty and mayo' },
      { name: 'Spicy Peri Peri Burger', price: 219, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1200&q=80', description: 'Hot peri peri sauce and onions' },
      { name: 'Maharaja Burger', price: 249, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80', description: 'Large size burger with rich layers' },
      { name: 'Crispy Chicken Burger', price: 269, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1200&q=80', description: 'Golden fried chicken and lettuce' }
    ]
  });
};

// NORTH INDIAN PAGE
exports.getNorthIndian = (req, res) => {
  res.render('north-indian', {
    title: 'North Indian Delights',
    restaurant: {
      name: 'Punjab Rasoi',
      diningRating: 4.4,
      deliveryRating: 4.2,
      description: 'Rich gravies, buttery breads and aromatic spices',
      banner1: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1400&q=80'
    },
    menu: [
      { name: 'Paneer Butter Masala', price: 289, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1200&q=80', description: 'Creamy tomato gravy with paneer cubes' },
      { name: 'Dal Makhani', price: 229, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80', description: 'Slow-cooked black lentils with butter' },
      { name: 'Shahi Paneer', price: 279, image: 'https://images.unsplash.com/photo-1690401767645-595de0e0e5f8?auto=format&fit=crop&w=1200&q=80', description: 'Royal paneer curry in rich cashew gravy' },
      { name: 'Chole Bhature', price: 189, image: 'https://images.unsplash.com/photo-1626132647523-66f6d9d375f7?auto=format&fit=crop&w=1200&q=80', description: 'Spiced chickpeas served with fluffy bhature' },
      { name: 'Rajma Chawal', price: 199, image: 'https://images.unsplash.com/photo-1596797038530-2c107aa10b45?auto=format&fit=crop&w=1200&q=80', description: 'Classic rajma curry with steamed rice' },
      { name: 'Kadhai Chicken', price: 329, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80', description: 'Spicy chicken tossed in kadhai masala' },
      { name: 'Butter Naan Basket', price: 119, image: 'https://images.unsplash.com/photo-1601050690117-5f3f0f0a0f6a?auto=format&fit=crop&w=1200&q=80', description: 'Fresh butter naan served hot' }
    ]
  });
};

// CHINESE PAGE
exports.getChinese = (req, res) => {
  res.render('chinese', {
    title: 'Chinese Fusion',
    restaurant: {
      name: 'Wok Street',
      diningRating: 4.1,
      deliveryRating: 4.3,
      description: 'Wok-tossed noodles, rice bowls and dim sums',
      banner1: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1400&q=80'
    },
    menu: [
      { name: 'Hakka Noodles', price: 209, image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=1200&q=80', description: 'Stir-fried noodles with sauces and veggies' },
      { name: 'Veg Fried Rice', price: 189, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80', description: 'Wok tossed rice with spring onion' },
      { name: 'Manchurian Gravy', price: 239, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80', description: 'Veg balls in spicy tangy gravy' },
      { name: 'Chilli Paneer', price: 259, image: 'https://images.unsplash.com/photo-1701579231374-f9706f97ec2f?auto=format&fit=crop&w=1200&q=80', description: 'Paneer cubes tossed in chili garlic sauce' },
      { name: 'Spring Roll', price: 169, image: 'https://images.unsplash.com/photo-1630912467423-763935f6bc45?auto=format&fit=crop&w=1200&q=80', description: 'Crispy rolls with cabbage filling' },
      { name: 'Schezwan Momos', price: 219, image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?auto=format&fit=crop&w=1200&q=80', description: 'Steamed momos with fiery schezwan' },
      { name: 'Hot Garlic Soup', price: 149, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80', description: 'Warm and spicy soup bowl' }
    ]
  });
};
