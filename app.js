const express = require("express");
const app = express();
require("express-async-errors");
const connectDB = require("./config/db");

const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");

require("dotenv").config();

connectDB();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  //aru route ma gayera test garna lai  throw new Error("test")
  //save the error somewhere since we needed it 
  console.log(err);
  return res.status(500).json({
    message: "Something went Wrong",
    error: err,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Port is listening to ${process.env.PORT}`);
});
