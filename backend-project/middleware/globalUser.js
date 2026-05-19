const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Cart = require("../models/Cart");

const globalUserMiddleware = async (req, res, next) => {
  let user = null;
  let cartCount = 0;
  const token = req.cookies.token;

  if (token) {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findById(data.id);
    } catch {}
  }

  if (!user && req.user) user = req.user;

  if (user?._id) {
    const cart = await Cart.findOne({ userId: user._id }).select("items.quantity");
    cartCount = cart
      ? cart.items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)
      : 0;
  }

  res.locals.user = user;
  res.locals.cartCount = cartCount;
  next();
};

module.exports = globalUserMiddleware;
