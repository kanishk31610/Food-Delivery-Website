require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

// Import config
const connectDB = require("./config/db");
require("./config/passport");

// Import middleware
const activityTrackerMiddleware = require("./middleware/activityTracker");
const globalUserMiddleware = require("./middleware/globalUser");

// Import routes
const authRoutes = require("./routes/authRoutes");
const pageRoutes = require("./routes/pageRoutes");
const menuRoutes = require("./routes/menuRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// ================= DB CONNECTION =================
connectDB();

// ================= APP CONFIG =================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ================= MIDDLEWARE =================
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: "secret123",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Activity tracker middleware
app.use(activityTrackerMiddleware);

// Global user middleware
app.use(globalUserMiddleware);

// ================= ROUTES =================
app.use(authRoutes);
app.use(pageRoutes);
app.use(menuRoutes);
app.use(cartRoutes);
app.use(orderRoutes);

// ================= 404 ERROR PAGE =================
app.use((req, res) => {
  res.status(404).render("404", { title: "404 - Page Not Found" });
});

// ================= SERVER =================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

