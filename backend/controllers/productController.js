import Product from "../models/productModel.js"
import handleAsync from "../utils/handleAsync.js"
import AppError from "../utils/AppError.js"

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = handleAsync(async (req, res) => {
    const pageSize = 2
    let { page = 1 } = req.query
    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: "i" } } : {}
    const count = await Product.countDocuments(keyword)
    const pages = Math.ceil(count / pageSize)
    page = Math.min(Number(page), pages)
    let products
    try {
        products = await Product.find(keyword)
            .limit(pageSize).skip(pageSize * (page - 1))
    } catch (error) {
        throw new AppError(404, "no such products")
    }

    res.status(200).json({
        products, page, pages
    })
})

// @desc    Fetch a product
// @route   GET /api/products/:id
// @access  Public
const getProductById = handleAsync(async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
        .populate({ path: "reviews", populate: { path: "user", select: "-password -email" } })
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

// @desc    Review a product
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = handleAsync(async (req, res) => {
    const { rating, comment } = req.body
    if (!rating || !comment) { throw new AppError(400, "Fill the rating and comment fields!") }

    const product = await Product.findById(req.params.id)
    if (!product) { throw new AppError(404, "No such product") }

    const isAlreadyReviewed = product.reviews.find(r => r.user.toString() == req.user._id)
    if (isAlreadyReviewed) { throw new AppError(400, "You have already reviewed this product") }

    product.reviews.push({
        user: req.user._id,
        rating: Number(rating),
        comment
    })
    product.numReviews = product.reviews.length
    product.rating = Math.round(product.reviews
        .reduce((acc, r) => acc + r.rating, 0) * 10 / product.numReviews) / 10

    await product.save()
    res.status(201).send({ message: "Reviewed" })
})


export {
    getProducts,
    getProductById,
    addProduct,
    editProduct,
    deleteProduct,
    createProductReview
}
