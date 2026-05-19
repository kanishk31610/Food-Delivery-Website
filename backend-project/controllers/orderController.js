const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Helper to calculate cart pricing (same as in cartController)
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

// GET ORDERS
exports.getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });

  res.render("orders", {
    title: "Order History",
    orders
  });
};

// CHECKOUT
exports.checkout = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });
  const pricing = calculateCartPricing(cart);
  const paymentMethod = String(req.body.paymentMethod || "cod").toLowerCase();

  if (!pricing.items.length) {
    return res.status(400).json({
      success: false,
      message: "Your cart is already empty"
    });
  }

  const etaMinutes = Math.floor(Math.random() * 16) + 20;

  const order = await Order.create({
    userId: req.user._id,
    items: pricing.items.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image
    })),
    pricing: {
      itemTotal: pricing.itemTotal,
      deliveryFee: pricing.deliveryFee,
      taxes: pricing.taxes,
      discount: pricing.discount,
      grandTotal: pricing.grandTotal
    },
    appliedOffer: {
      code: pricing.appliedOffer?.code || "",
      label: pricing.appliedOffer?.label || ""
    },
    paymentMethod: paymentMethod === "cod" ? "cod" : "cod",
    paymentStatus: "cash_on_delivery",
    etaMinutes,
    status: "placed"
  });

  if (cart) {
    cart.items = [];
    cart.appliedOfferCode = "";
    cart.appliedOfferLabel = "";
    await cart.save();
  }

  return res.json({
    success: true,
    orderId: order._id,
    etaMinutes,
    amountPaid: pricing.grandTotal,
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    message: `Your Cash on Delivery order is placed and will arrive in about ${etaMinutes} minutes. Thank you!`
  });
};
