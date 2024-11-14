
const mongoose = require("mongoose")

const connectDB = async ()=>{ 
  try{
    await mongoose.connect("mongodb+srv://admin:admin@newapis.olpnfrw.mongodb.net/Ecommerce-shop");
    console.log("Database connected successfully");
  }
    catch(e) {
        console.log("Error connecting to database", e);
    }
}

module.exports = connectDB