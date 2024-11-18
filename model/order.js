const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        price: Number
      },
    ],
    total: Number,
    status:{
      type:String,
      enum:['pending','completed','cancelled'],
      default: 'pending'
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Order", orderSchema);
