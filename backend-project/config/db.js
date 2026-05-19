const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/backendDB");
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = connectDB;
