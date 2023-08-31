import { Router } from "express"
import { getProducts, getProductById, addProduct, editProduct, deleteProduct } from "../controllers/productController.js"
import { checkUser, isAdmin } from "../middleware/authMiddleware.js"

const router = Router()

router.route("/")
    .get(getProducts)
    .post(checkUser, isAdmin, addProduct)
    .delete(checkUser, isAdmin, deleteProduct)

router.route("/:id")
    .get(getProductById)
    .put(checkUser, isAdmin, editProduct)

export default router