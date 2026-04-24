const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  category: String,
  stock: Number
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;