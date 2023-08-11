import { Router } from "express"
import {
    userLogin, userLogout, userRegister, getUserProfile, updateUserProfile,
    getUsers, getUserById, deleteUser, updateUser //admin
} from "../controllers/userController.js"

const router = Router()

router.post("/login", userLogin)
router.post("/logout", userLogout)
router.route("/profile").get(getUserProfile).put(updateUserProfile)
router.route("/:id").get(getUserById).delete(deleteUser).put(updateUser)
router.route("/").post(userRegister).get(getUsers)


export default router