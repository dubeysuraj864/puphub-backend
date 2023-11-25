const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  imageUrl: String,
  title: String,
  description: String,
  price: String,
});

module.exports = mongoose.model("products", productSchema);
