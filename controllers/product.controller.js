const order = require("../model/order");
const Product = require("../model/product");

const getProducts = async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;

  const filter = {};
  const sort = {};

  if (req.query.priceOrder) {
    sort.price = req.query.priceOrder;
  }

  if (req.query.search) {
    filter.name = new RegExp(req.query.search, "i");
  }

  if (req.query.minPrice && req.query.maxPrice) {
    filter.price = {
      $lte: req.query.minPrice,
      $gte: req.query.maxPrice,
    };
  }

  try {
    const product = await Product.find(filter)
      .sort(sort)
      .limit(limit)
      .skip((page - 1) * limit); // Pagination

    const totalProducts = await Product.countDocuments(filter); // Count total products
    res.json({
      total: totalProducts,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error fetching products",
      error: error.message,
    });
  }
};

//validate products haru sapai add garda update garda as name string price>0 and numeric  yestai yestaii
const addProducts = async (req, res) => {
  const data = req.body;
  console.log(req.file);
  if (!data) {
    return res.status(400).json({ msg: "No data selected for addition" });
  }
  await Product.create({
    name: data.name,
    price: data.price,
    image: req.file.filename,
    quantity: data.quantity,
    user: req.user._id,
  }).then(() => {
    res.json({
      msg: "Products added successfully",
    });
  });
};

const updateProducts = async (req, res) => {
  const updateId = req.params.id;
  const fields = req.body;
  const data = await Product.findByIdAndUpdate(updateId, { $set: fields });
  if (!data) {
    return res.json({
      msg: "No data found ",
    });
  }
  return res.json({
    msg: "Data updated successfully",
  });
};

const deleteProducts = async (req, res) => {
  const deletedProducts = await Product.findByIdAndDelete(req.params.id);
  console.log(deleteProducts);
  if (!deletedProducts)
    return res.status(400).json({
      msg: "Data not found",
    });
  return res.json({
    msg: "Data deleted successfully",
  });
};

const getProductById = async (req, res) => {
  const productSingle = await Product.findOne({ _id: req.params.id });
  if (!productSingle)
    return res.status(400).json({
      msg: "Product nowhere to be found",
    });
  return res.json({
    msg: "Product data fetched succesfully",
    data: productSingle,
  });
};

const createOrders = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      msg: "No Products for Order",
    });
  }
  try {
    const { products } = req.body;
    let total = 0;
    for (let product of products) {
      const productDetails = await Product.findOne({ _id: product._id });
      product.price = productDetails.price;
      total += product.quantity * product.price;
    }
    await order.create({
      user: req.user._id,
      products,
      total: total,
    });
    return res.status(200).json({
      message: "Order Created Successfully",
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      msg: "Failed to create the order",
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  updateProducts,
  deleteProducts,
  getProductById,
  addProducts,
  createOrders,
};
