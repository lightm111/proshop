import { Router } from "express"
import {
    userLogin, userLogout, userRegister, getUserProfile, updateUserProfile,
    getUsers, getUserById, deleteUser, updateUser //admin
} from "../controllers/userController.js"
import { checkUser, isAdmin } from "../middleware/authMiddleware.js"

const router = Router()

router.post("/login", userLogin)
router.post("/logout", checkUser, userLogout)
router.route("/profile")
    .get(checkUser, getUserProfile)
    .put(checkUser, updateUserProfile)
router.route("/:id")
    .get(checkUser, isAdmin, getUserById)
    .delete(checkUser, isAdmin, deleteUser)
    .put(checkUser, isAdmin, updateUser)
router.route("/")
    .post(userRegister)
    .get(checkUser, isAdmin, getUsers)


export default router