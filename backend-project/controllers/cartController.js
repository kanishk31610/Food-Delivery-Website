const Cart = require("../models/Cart");
const User = require("../models/User");

const OFFER_CATALOG = {
  PIZZA40: {
    code: "PIZZA40",
    label: "Pizza Party Deal",
    minAmount: 499,
    type: "percentage",
    value: 40,
    maxDiscount: 200,
    description: "40% off on pizza orders above ₹499"
  },
  BURGERBOGO: {
    code: "BURGERBOGO",
    label: "Burger Combo Day",
    minAmount: 299,
    type: "flat",
    value: 80,
    description: "Flat ₹80 off on burger orders above ₹299"
  },
  NORTH120: {
    code: "NORTH120",
    label: "North Indian Feast",
    minAmount: 699,
    type: "flat",
    value: 120,
    description: "Instant ₹120 off on orders above ₹699"
  },
  CHINESEFREE: {
    code: "CHINESEFREE",
    label: "Chinese Special",
    minAmount: 299,
    type: "delivery",
    value: 30,
    description: "Free delivery on Chinese orders above ₹299"
  }
};

function getOfferConfig(code) {
  if (!code) return null;
  return OFFER_CATALOG[String(code).toUpperCase()] || null;
}

function getCartCount(cart) {
  if (!cart) return 0;
  return cart.items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
}

function calculateCartPricing(cart) {
  const items = cart ? cart.items : [];
  const itemTotal = items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
  const deliveryFee = items.length ? 30 : 0;
  const taxes = items.length ? Math.round(itemTotal * 0.05) : 0;

  const appliedOffer = getOfferConfig(cart?.appliedOfferCode);
  let discount = 0;
  let offerMessage = "";
  let offerValid = false;

  if (appliedOffer && items.length) {
    if (itemTotal >= appliedOffer.minAmount) {
      offerValid = true;

      if (appliedOffer.type === "percentage") {
        discount = Math.min(Math.round((itemTotal * appliedOffer.value) / 100), appliedOffer.maxDiscount || Number.MAX_SAFE_INTEGER);
      } else if (appliedOffer.type === "flat") {
        discount = appliedOffer.value;
      } else if (appliedOffer.type === "delivery") {
        discount = deliveryFee;
      }

      discount = Math.min(discount, itemTotal + deliveryFee + taxes);
    } else {
      offerMessage = `Add ₹${appliedOffer.minAmount - itemTotal} more to use ${appliedOffer.code}`;
    }
  }

  const grandTotal = Math.max(itemTotal + deliveryFee + taxes - discount, 0);

  return {
    items,
    itemTotal,
    deliveryFee,
    taxes,
    discount,
    grandTotal,
    appliedOffer: appliedOffer ? {
      code: appliedOffer.code,
      label: appliedOffer.label,
      description: appliedOffer.description,
      valid: offerValid,
      message: offerMessage
    } : null
  };
}

async function saveAppliedOffer(cart, code, label) {
  cart.appliedOfferCode = code || "";
  cart.appliedOfferLabel = label || "";
  await cart.save();
}

async function addItemToUserCart(userId, name, price, image) {
  const safePrice = Number(price) || 0;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    const user = await User.findById(userId);
    cart = new Cart({
      userId,
      userName: user?.username || "",
      userEmail: user?.email || "",
      items: []
    });
  }

  const existingItem = cart.items.find((item) => item.name === name && item.image === image);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ name, price: safePrice, image, quantity: 1 });
  }

  await cart.save();
}

// VIEW CART
exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });
  const pricing = calculateCartPricing(cart);

  res.render("cart", {
    items: pricing.items,
    itemTotal: pricing.itemTotal,
    deliveryFee: pricing.deliveryFee,
    taxes: pricing.taxes,
    discount: pricing.discount,
    grandTotal: pricing.grandTotal,
    appliedOffer: pricing.appliedOffer
  });
};

// ADD TO CART (POST from Pizza page)
exports.addToCartPizza = async (req, res) => {
  const { name, price, image } = req.body;
  await addItemToUserCart(req.user._id, name, price, image);
  res.redirect("/pizza");
};

// ADD TO CART (POST from Burger page)
exports.addToCartBurger = async (req, res) => {
  const { name, price, image } = req.body;
  await addItemToUserCart(req.user._id, name, price, image);
  res.redirect("/burger");
};

// ADD TO CART (POST from North Indian page)
exports.addToCartNorthIndian = async (req, res) => {
  const { name, price, image } = req.body;
  await addItemToUserCart(req.user._id, name, price, image);
  res.redirect("/north-indian");
};

// ADD TO CART (POST from Chinese page)
exports.addToCartChinese = async (req, res) => {
  const { name, price, image } = req.body;
  await addItemToUserCart(req.user._id, name, price, image);
  res.redirect("/chinese");
};

// UPDATE QUANTITY
exports.updateQuantity = async (req, res) => {
  const { name, image, action } = req.body;

  const cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) return res.redirect("/cart");

  const item = cart.items.find((entry) => entry.name === name && entry.image === image);
  if (!item) return res.redirect("/cart");

  if (action === "inc") {
    item.quantity += 1;
  } else if (action === "dec") {
    item.quantity -= 1;
  }

  cart.items = cart.items.filter((entry) => entry.quantity > 0);

  if (!cart.items.length) {
    cart.appliedOfferCode = "";
    cart.appliedOfferLabel = "";
  }

  await cart.save();

  res.redirect("/cart");
};

// REMOVE ITEM
exports.removeItem = async (req, res) => {
  const { name, image } = req.body;

  const cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) return res.redirect("/cart");

  cart.items = cart.items.filter((entry) => !(entry.name === name && entry.image === image));
  await cart.save();

  res.redirect("/cart");
};

// API: APPLY OFFER
exports.applyOffer = async (req, res) => {
  const { code } = req.body;
  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart || !cart.items.length) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  const offer = getOfferConfig(code);
  if (!offer) {
    return res.status(400).json({ success: false, message: "Invalid offer code" });
  }

  const pricing = calculateCartPricing({ ...cart.toObject(), appliedOfferCode: offer.code });
  if (!pricing.appliedOffer?.valid) {
    return res.status(400).json({ success: false, message: pricing.appliedOffer?.message || "Offer not valid for this cart" });
  }

  await saveAppliedOffer(cart, offer.code, offer.label);
  const savedCart = await Cart.findOne({ userId: req.user._id });
  const savedPricing = calculateCartPricing(savedCart);

  return res.json({
    success: true,
    message: `${offer.label} applied successfully`,
    pricing: savedPricing
  });
};

// API: GET CART ITEMS
exports.cartApiItems = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });
  const pricing = calculateCartPricing(cart);
  return res.json({
    success: true,
    items: pricing.items,
    cartCount: getCartCount(cart),
    pricing
  });
};

// API: ADD TO CART
exports.cartApiAdd = async (req, res) => {
  const { name, price, image } = req.body;
  await addItemToUserCart(req.user._id, name, price, image);

  const cart = await Cart.findOne({ userId: req.user._id });
  const item = cart?.items.find((entry) => entry.name === name && entry.image === image);

  return res.json({
    success: true,
    itemQuantity: item ? item.quantity : 0,
    cartCount: getCartCount(cart),
    pricing: calculateCartPricing(cart)
  });
};

// API: UPDATE CART
exports.cartApiUpdate = async (req, res) => {
  const { name, image, action } = req.body;
  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    return res.json({ success: true, itemQuantity: 0, cartCount: 0 });
  }

  const item = cart.items.find((entry) => entry.name === name && entry.image === image);
  if (!item) {
    return res.json({ success: true, itemQuantity: 0, cartCount: getCartCount(cart) });
  }

  if (action === "inc") {
    item.quantity += 1;
  } else if (action === "dec") {
    item.quantity -= 1;
  }

  cart.items = cart.items.filter((entry) => entry.quantity > 0);
  await cart.save();

  const updatedItem = cart.items.find((entry) => entry.name === name && entry.image === image);

  return res.json({
    success: true,
    itemQuantity: updatedItem ? updatedItem.quantity : 0,
    cartCount: getCartCount(cart),
    pricing: calculateCartPricing(cart)
  });
};

// API: REMOVE FROM CART
exports.cartApiRemove = async (req, res) => {
  const { name, image } = req.body;
  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    return res.json({ success: true, cartCount: 0 });
  }

  cart.items = cart.items.filter((entry) => !(entry.name === name && entry.image === image));

  if (!cart.items.length) {
    cart.appliedOfferCode = "";
    cart.appliedOfferLabel = "";
  }

  await cart.save();

  return res.json({ success: true, cartCount: getCartCount(cart), pricing: calculateCartPricing(cart) });
};
