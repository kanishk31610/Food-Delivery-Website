const express = require("express");
const menuController = require("../controllers/menuController");

const router = express.Router();

// MENU PAGES
router.get("/pizza", menuController.getPizza);
router.get("/burger", menuController.getBurger);
router.get("/north-indian", menuController.getNorthIndian);
router.get("/chinese", menuController.getChinese);

module.exports = router;
