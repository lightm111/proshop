import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import handleAsync from "../utils/handleAsync.js";
import AppError from "../utils/AppError.js";

const checkUser = handleAsync(async (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decodedToken.userId).select("-password")
            next()
        } catch (error) {
            throw new AppError(401, "Not authorized, invalid token")
        }
    } else {
        throw new AppError(401, "Not authorized, no token found")
    }
})

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) { next() }
    else { throw new AppError(401, "Not authorized, no an admin") }
}

export { checkUser, isAdmin }