import Order from "../models/orderModel.js"
import AppError from "../utils/AppError.js"
import handleAsync from "../utils/handleAsync.js"

// @desc    Make a new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = handleAsync(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod,
        itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body
    if (orderItems && orderItems.length === 0) {
        throw new AppError(400, "No order items found")
    }
    const order = new Order({
        user: req.user._id,
        orderItems: orderItems.map(item => ({
            ...item,
            product: item._id,
            _id: undefined
        })),
        shippingAddress, paymentMethod,
        itemsPrice, taxPrice, shippingPrice, totalPrice
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
})

// @desc    Get orders of the logged in user
// @route   GET /api/orders/my-order
// @access  Private
const getMyOrder = handleAsync(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    if (!orders) {
        req.status(404).send("No orders yet")
    }
    req.status(200).json(orders)
})

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = handleAsync(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email")
    if (!order) {
        throw new AppError(404, "No such orders")
    }
    res.status(200).json(order)
})

// @desc    Update order status to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = handleAsync(async (req, res) => {
    res.send("update order status to paid")
})

// @desc    Update order status to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = handleAsync(async (req, res) => {
    res.send("update order status to delivered")
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = handleAsync(async (req, res) => {
    const orders = await Order.find({})
    res.status(200).json(orders)
})

export {
    addOrderItems,
    getMyOrder,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getAllOrders
}