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

// @desc    Edit a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const editProduct = handleAsync(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        for (const key in req.body) {
            product[key] = req.body[key]
        }
        const updatedProduct = await product.save()
        res.status(200).json(updatedProduct)
    } else {
        throw new AppError(404, "No such product")
    }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = handleAsync(async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (product) {
        const deletedProduct = await product.deleteOne()
        res.status(200).json({ "message": `Product #${id} deleted` })
    } else {
        throw new AppError(404, "No such product")
    }
})


export {
    getProducts,
    getProductById,
    addProduct,
    editProduct,
    deleteProduct
}
