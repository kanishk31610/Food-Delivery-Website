const express = require("express");
const passport = require("passport");
const upload = require("../middleware/upload");
const { isLoggedIn } = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

const router = express.Router();

// SIGNUP
router.get("/signin", authController.getSignin);
router.post("/signin", upload.single("profilePic"), authController.postSignin);

// LOGIN
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

// GOOGLE LOGIN
router.get("/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"
  })
);

router.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  authController.googleCallback
);

// PROFILE
router.get("/profile", isLoggedIn, authController.getProfile);

// EDIT PROFILE PAGE
router.get("/edit-profile", isLoggedIn, authController.getEditProfile);

// UPDATE PROFILE
router.post("/edit-profile", isLoggedIn, upload.single("profilePic"), authController.postEditProfile);

// DELETE ACCOUNT
router.post("/delete-account", isLoggedIn, authController.deleteAccount);

// LOGOUT
router.get("/logout", authController.logout);

module.exports = router;
