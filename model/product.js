const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  price: Number,
  image:String,
  stock: Number,
});
module.exports = mongoose.model("Product", ProductSchema);
