const Product = require("../model/product")

const getProducts = async (req, res) => {
    const product = await Product.find()
    res.json({
        data: product
    })
}

const addProducts = async (req, res) => {
    const data = req.body
    if (!data) { return res.status(400).json({ msg: "No data selected for addition" }) }
    await Product.create({
        name: data.name,
        price: data.price,
        quantity: data.quantity
    }).then(() => {
        res.json({
            msg: "Products added successfully"
        })
    })
}

const updateProducts = async (req, res) => {
    const updateId = req.params.id
    const fields = req.body
    const data = await Product.findByIdAndUpdate(updateId, { $set: fields })
    if (!data) {
        return res.json({
            msg: "No data found "
        })
    }
    return res.json({
        msg: "Data updated successfully",
    })
}

const deleteProducts = async (req, res) => {
    const deletedProducts = await Product.findByIdAndDelete(req.params.id)
    console.log(deleteProducts);
    if (!deletedProducts) return res.status(400).json({
        msg: "Data not found"
    })
    return res.json({
        msg: "Data deleted successfully",
    })
}

const getProductById = async (req, res) => {
    const productSingle = await Product.findOne({ _id: req.params.id })
    if (!productSingle) return res.status(400).json({
        msg: "Product nowhere to be found"
    })
    return res.json({
        msg: "Product data fetched succesfully",
        data: productSingle,
    })
}

module.exports = {
    getProducts, updateProducts, deleteProducts, getProductById, addProducts
}