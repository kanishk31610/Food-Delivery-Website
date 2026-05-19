const express = require("express");
const { isLoggedIn, isLoggedInApi } = require("../middleware/authMiddleware");
const cartController = require("../controllers/cartController");

const router = express.Router();

// VIEW CART
router.get("/cart", isLoggedIn, cartController.getCart);

// ADD TO CART (Form submissions from menu pages)
router.post("/add-to-cart", isLoggedIn, cartController.addToCartPizza);
router.post("/add-to-cart-burger", isLoggedIn, cartController.addToCartBurger);
router.post("/add-to-cart-north-indian", isLoggedIn, cartController.addToCartNorthIndian);
router.post("/add-to-cart-chinese", isLoggedIn, cartController.addToCartChinese);

// UPDATE QUANTITY
router.post("/cart/update-quantity", isLoggedIn, cartController.updateQuantity);

// REMOVE ITEM
router.post("/cart/remove", isLoggedIn, cartController.removeItem);

// API: APPLY OFFER
router.post("/api/cart/apply-offer", isLoggedInApi, cartController.applyOffer);

// API: GET CART ITEMS
router.get("/api/cart/items", isLoggedInApi, cartController.cartApiItems);

// API: ADD TO CART
router.post("/api/cart/add", isLoggedInApi, cartController.cartApiAdd);

// API: UPDATE CART
router.post("/api/cart/update", isLoggedInApi, cartController.cartApiUpdate);

// API: REMOVE FROM CART
router.post("/api/cart/remove", isLoggedInApi, cartController.cartApiRemove);

module.exports = router;
