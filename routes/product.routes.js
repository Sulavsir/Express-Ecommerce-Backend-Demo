const router = require("express").Router()
const { getProducts, updateProducts, deleteProducts, getProductById, addProducts } = require("../controllers/product.controller")



router.get("/", getProducts)
router.post("/add", addProducts)
router.patch("/update/:id", updateProducts)
router.delete("/delete/:id", deleteProducts)
router.get("/:id", getProductById)


module.exports = router;