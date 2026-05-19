const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const { issueAuthToken } = require("../middleware/authMiddleware");

// SIGNUP
exports.getSignin = (req, res) => {
  res.render("signin", { title: "Sign Up", error: null });
};

exports.postSignin = async (req, res) => {
  const { username, email, password } = req.body;

  const exist = await User.findOne({ email });
  if (exist) {
    return res.render("signin", { title: "Sign Up", error: "Email exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  await User.create({
    username,
    email,
    password: hash,
    profilePic: req.file ? req.file.filename : null
  });

  res.redirect("/login");
};

// LOGIN
exports.getLogin = (req, res) => {
  res.render("login", { title: "Login", error: null });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.render("login", { error: "User not found" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.render("login", { error: "Wrong password" });

  const token = issueAuthToken(user);

  res.cookie("token", token, { httpOnly: true });

  res.redirect("/");
};

// GOOGLE CALLBACK
exports.googleCallback = (req, res) => {
  const token = issueAuthToken(req.user);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax"
  });

  res.redirect("/");
};

// PROFILE
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.render("profile", { user });
};

// EDIT PROFILE PAGE
exports.getEditProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  res.render("edit-profile", {
    user,
    title: "Edit Profile"
  });
};

// UPDATE PROFILE
exports.postEditProfile = async (req, res) => {
  const { username, email } = req.body;
  let updateData = {
    username,
    email
  };
  if (req.file) {
    updateData.profilePic = req.file.filename;
  }

  await User.findByIdAndUpdate(req.user._id, updateData);

  res.redirect("/profile");
};

// DELETE ACCOUNT
exports.deleteAccount = async (req, res) => {
  const userId = req.user._id;

  await Promise.all([
    User.findByIdAndDelete(userId),
    Cart.deleteMany({ userId }),
    Order.deleteMany({ userId })
  ]);

  req.logout(() => {});
  res.clearCookie("token");
  res.redirect("/login");
};

// LOGOUT
exports.logout = (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.clearCookie("token");
      res.redirect("/login");
    });
  });
};
