const express = require("express");
const { isLoggedIn, isLoggedInApi } = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController");

const router = express.Router();

// GET ORDERS
router.get("/orders", isLoggedIn, orderController.getOrders);

// CHECKOUT
router.post("/api/cart/checkout", isLoggedInApi, orderController.checkout);

module.exports = router;
