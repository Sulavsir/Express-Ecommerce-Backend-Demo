const router = require("express").Router();
const {
  getProducts,
  updateProducts,
  deleteProducts,
  getProductById,
  addProducts,
  createOrders,
} = require("../controllers/product.controller");
const checkAuth = require("../middlewares/auth.middleware");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").at(-1); //split le array ma audoraixa nam
    cb(null, uniqueSuffix + "." + extension);
  },
});
const upload = multer({ storage: storage });

router.get("/", getProducts);
router.post("/add", upload.single("image"), checkAuth("Admin"), addProducts);
router.patch("/update/:id", checkAuth("Admin"), updateProducts);
router.delete("/delete/:id", checkAuth("Admin"), deleteProducts);
router.get("/:id", getProductById);
router.post("/create-order", checkAuth(), createOrders);

module.exports = router;
