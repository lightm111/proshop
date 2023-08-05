import Product from "../models/productModel.js"
import handleAsync from "../utils/handleAsync.js"

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = handleAsync(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// @desc    Fetch a product
// @route   GET /api/products/:id
// @access  Public
const getProductById = handleAsync(async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) {
        throw new Error("No such product")
    }
    res.json(product)
})

export { getProducts, getProductById }
