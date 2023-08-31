import { Router } from "express"
import { getProducts, getProductById, addProduct, editProduct } from "../controllers/productController.js"
import { checkUser, isAdmin } from "../middleware/authMiddleware.js"

const router = Router()

router.route("/")
    .get(getProducts)
    .post(checkUser, isAdmin, addProduct)

router.route("/:id")
    .get(getProductById)
    .put(checkUser, isAdmin, editProduct)

export default router