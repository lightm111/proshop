import Product from "../models/productModel.js"
import handleAsync from "../utils/handleAsync.js"
import AppError from "../utils/AppError.js"

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = handleAsync(async (req, res) => {
    const products = await Product.find({})
    res.status(200).json(products)
})

// @desc    Fetch a product
// @route   GET /api/products/:id
// @access  Public
const getProductById = handleAsync(async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) {
        throw new AppError(404, "No such product")
    }
    res.status(200).json(product)
})

// @desc    Add a product
// @route   POST /api/products
// @access  Private/Admin
const addProduct = handleAsync(async (req, res) => {
    const product = new Product({ ...req.body, rating: 0, user: req.user._id })
    const newProduct = await product.save()
    res.status(201).json(newProduct)
})

export { getProducts, getProductById, addProduct }
