import { Router } from "express"
import {
    addOrderItems, getMyOrder, getOrderById, updateOrderToPaid, updateOrderToDelivered, getAllOrders
} from "../controllers/orderController.js"
import { checkUser, isAdmin } from "../middleware/authMiddleware.js"

const router = Router()

router.route("/")
    .post(checkUser, addOrderItems)
    .get(checkUser, isAdmin, getAllOrders)
router.get("/my-order", checkUser, getMyOrder)
router.get("/:id", checkUser, getOrderById)
router.get("/:id/pay", checkUser, updateOrderToPaid)
router.get("/:id/deliver", checkUser, isAdmin, updateOrderToDelivered)

export default router