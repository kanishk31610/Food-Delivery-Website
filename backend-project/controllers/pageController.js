const MENU_SEARCH_INDEX = [
  { name: "Paneer Pizza", price: 299, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80", description: "Loaded with paneer cubes and cheese", category: "Pizza", route: "/pizza" },
  { name: "Margherita Pizza", price: 249, image: "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?auto=format&fit=crop&w=1200&q=80", description: "Classic cheese and tomato base", category: "Pizza", route: "/pizza" },
  { name: "Farmhouse Pizza", price: 349, image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=80", description: "Mushroom, capsicum, onion and olives", category: "Pizza", route: "/pizza" },
  { name: "Veggie Delight", price: 319, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=80", description: "Fresh veggies with mozzarella topping", category: "Pizza", route: "/pizza" },
  { name: "Cheese Burst", price: 389, image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1200&q=80", description: "Extra melted cheese in every bite", category: "Pizza", route: "/pizza" },
  { name: "Mexican Green Wave", price: 359, image: "https://images.unsplash.com/photo-1600628422019-f60cd59d8d26?auto=format&fit=crop&w=1200&q=80", description: "Spicy jalapeno, onion and herbs", category: "Pizza", route: "/pizza" },
  { name: "Tandoori Paneer", price: 419, image: "https://images.unsplash.com/photo-1620374645498-af6bd681a0bd?auto=format&fit=crop&w=1200&q=80", description: "Smoky tandoori paneer and capsicum", category: "Pizza", route: "/pizza" },
  { name: "Classic Veg Burger", price: 149, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80", description: "Crispy patty with fresh veggies", category: "Burger", route: "/burger" },
  { name: "Cheese Blast Burger", price: 179, image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1200&q=80", description: "Double cheese melt with soft bun", category: "Burger", route: "/burger" },
  { name: "Paneer Tikka Burger", price: 199, image: "https://images.unsplash.com/photo-1610970878459-a0e464d7592b?auto=format&fit=crop&w=1200&q=80", description: "Smoky paneer tikka patty burger", category: "Burger", route: "/burger" },
  { name: "Aloo Crunch Burger", price: 129, image: "https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=1200&q=80", description: "Crunchy potato patty and mayo", category: "Burger", route: "/burger" },
  { name: "Spicy Peri Peri Burger", price: 219, image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1200&q=80", description: "Hot peri peri sauce and onions", category: "Burger", route: "/burger" },
  { name: "Maharaja Burger", price: 249, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80", description: "Large size burger with rich layers", category: "Burger", route: "/burger" },
  { name: "Crispy Chicken Burger", price: 269, image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1200&q=80", description: "Golden fried chicken and lettuce", category: "Burger", route: "/burger" },
  { name: "Paneer Butter Masala", price: 289, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1200&q=80", description: "Creamy tomato gravy with paneer cubes", category: "North Indian", route: "/north-indian" },
  { name: "Dal Makhani", price: 229, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80", description: "Slow-cooked black lentils with butter", category: "North Indian", route: "/north-indian" },
  { name: "Shahi Paneer", price: 279, image: "https://images.unsplash.com/photo-1690401767645-595de0e0e5f8?auto=format&fit=crop&w=1200&q=80", description: "Royal paneer curry in rich cashew gravy", category: "North Indian", route: "/north-indian" },
  { name: "Chole Bhature", price: 189, image: "https://images.unsplash.com/photo-1626132647523-66f6d9d375f7?auto=format&fit=crop&w=1200&q=80", description: "Spiced chickpeas served with fluffy bhature", category: "North Indian", route: "/north-indian" },
  { name: "Rajma Chawal", price: 199, image: "https://images.unsplash.com/photo-1596797038530-2c107aa10b45?auto=format&fit=crop&w=1200&q=80", description: "Classic rajma curry with steamed rice", category: "North Indian", route: "/north-indian" },
  { name: "Kadhai Chicken", price: 329, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80", description: "Spicy chicken tossed in kadhai masala", category: "North Indian", route: "/north-indian" },
  { name: "Butter Naan Basket", price: 119, image: "https://images.unsplash.com/photo-1601050690117-5f3f0f0a0f6a?auto=format&fit=crop&w=1200&q=80", description: "Fresh butter naan served hot", category: "North Indian", route: "/north-indian" },
  { name: "Hakka Noodles", price: 209, image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=1200&q=80", description: "Stir-fried noodles with sauces and veggies", category: "Chinese", route: "/chinese" },
  { name: "Veg Fried Rice", price: 189, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80", description: "Wok tossed rice with spring onion", category: "Chinese", route: "/chinese" },
  { name: "Manchurian Gravy", price: 239, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80", description: "Veg balls in spicy tangy gravy", category: "Chinese", route: "/chinese" },
  { name: "Chilli Paneer", price: 259, image: "https://images.unsplash.com/photo-1701579231374-f9706f97ec2f?auto=format&fit=crop&w=1200&q=80", description: "Paneer cubes tossed in chili garlic sauce", category: "Chinese", route: "/chinese" },
  { name: "Spring Roll", price: 169, image: "https://images.unsplash.com/photo-1630912467423-763935f6bc45?auto=format&fit=crop&w=1200&q=80", description: "Crispy rolls with cabbage filling", category: "Chinese", route: "/chinese" },
  { name: "Schezwan Momos", price: 219, image: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?auto=format&fit=crop&w=1200&q=80", description: "Steamed momos with fiery schezwan", category: "Chinese", route: "/chinese" },
  { name: "Hot Garlic Soup", price: 149, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80", description: "Warm and spicy soup bowl", category: "Chinese", route: "/chinese" }
];

function scoreSearchMatch(item, normalizedQuery) {
  const name = item.name.toLowerCase();
  const description = (item.description || "").toLowerCase();
  const category = item.category.toLowerCase();

  if (name === normalizedQuery) return 120;
  if (name.startsWith(normalizedQuery)) return 90;
  if (name.includes(normalizedQuery)) return 75;
  if (category.includes(normalizedQuery)) return 55;
  if (description.includes(normalizedQuery)) return 35;
  return 0;
}

// HOME
exports.getHome = (req, res) => {
  res.render("home", { title: "Home" });
};

// ABOUT PAGE
exports.getAbout = (req, res) => {
  res.render("about", { title: "Who We Are" });
};

// BLOG PAGE
exports.getBlog = (req, res) => {
  res.render("blog", { title: "Blog" });
};

// DINING PAGE
exports.getExplore = (req, res) => {
  res.render("explore", { title: "Dining" });
};

// OFFERS PAGE
exports.getOffers = (req, res) => {
  res.render("offers", { title: "Offers" });
};

// CODE OF CONDUCT
exports.getCodeOfConduct = (req, res) => {
  res.render("codeofconduct", { title: "Code of Conduct" });
};

// PARTNER WITH US
exports.getPartnerWithUs = (req, res) => {
  res.render("partnerwithus", { title: "Partner with Us" });
};

// CONTACT US
exports.getContact = (req, res) => {
  const success = req.query.success === "1";
  res.render("contact", { title: "Contact Us", success });
};

exports.postContact = (req, res) => {
  res.redirect("/contact?success=1");
};

// TERMS AND CONDITIONS
exports.getTermsAnd = (req, res) => {
  res.render("terms-and-conditions", { title: "Terms and Conditions" });
};

exports.getTermsClean = (req, res) => {
  res.render("terms-and-conditions", { title: "Terms and Conditions" });
};

// PRIVACY POLICY
exports.getPrivacy = (req, res) => {
  res.render("privacy-policy", { title: "Privacy Policy" });
};

// SECURITY
exports.getSecurity = (req, res) => {
  res.render("security", { title: "Security" });
};

// REPORT PAGE
exports.getReport = (req, res) => {
  const success = req.query.success === "1";
  res.render("report", { title: "Report Issue", success });
};

exports.postReport = (req, res) => {
  res.redirect("/report?success=1");
};

// SEARCH
exports.getSearch = (req, res) => {
  const query = String(req.query.q || "").trim();
  const normalizedQuery = query.toLowerCase();

  const results = normalizedQuery
    ? MENU_SEARCH_INDEX
        .map((item) => ({ ...item, _score: scoreSearchMatch(item, normalizedQuery) }))
        .filter((item) => item._score > 0)
        .sort((a, b) => b._score - a._score || a.price - b.price)
        .map(({ _score, ...item }) => item)
    : [];

  res.render("search", {
    title: "Search",
    query,
    results
  });
};
