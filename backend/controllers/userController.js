import User from "../models/userModel.js"
import handleAsync from "../utils/handleAsync.js"
import AppError from "../utils/AppError.js"
import jwt from "jsonwebtoken"

// @desc    User login & send token
// @route   POST /api/users/login
// @access  Public
const userLogin = handleAsync(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && await user.matchPassword(password)) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        // set jwt token as http-only  cookie
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict"
        })

        res.json(user)
    } else {
        res.status(401)
        throw new AppError(401, "Invalid email or password")
    }
})

// @desc    User logout
// @route   GET /api/users/logout
// @access  Private
const userLogout = handleAsync(async (req, res) => {
    res.send("user logout")
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const userRegister = handleAsync(async (req, res) => {
    res.send("user register")
})

// @desc    User profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = handleAsync(async (req, res) => {
    res.send("user profile")
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = handleAsync(async (req, res) => {
    res.send("update user profile")
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = handleAsync(async (req, res) => {
    res.send("get users")
})

// @desc    Get one user by id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = handleAsync(async (req, res) => {
    res.send("get user by id")
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = handleAsync(async (req, res) => {
    res.send("delete user")
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = handleAsync(async (req, res) => {
    res.send("update a user")
})

export {
    userLogin, userLogout, userRegister, getUserProfile, updateUserProfile,
    getUsers, getUserById, deleteUser, updateUser //admin
}
