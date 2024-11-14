const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./config/db");

const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");

connectDB();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Port is listening to ${port}`);
});
