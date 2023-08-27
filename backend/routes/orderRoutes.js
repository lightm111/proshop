import { Router } from "express"
import {
    addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getAllOrders
} from "../controllers/orderController.js"
import { checkUser, isAdmin } from "../middleware/authMiddleware.js"

const router = Router()

router.route("/")
    .post(checkUser, addOrderItems)
    .get(checkUser, isAdmin, getAllOrders)
router.get("/my-orders", checkUser, getMyOrders)
router.get("/:id", checkUser, getOrderById)
router.put("/:id/pay", checkUser, updateOrderToPaid)
router.put("/:id/deliver", checkUser, isAdmin, updateOrderToDelivered)

export default router