import User from "../models/userModel.js"
import handleAsync from "../utils/handleAsync.js"
import AppError from "../utils/AppError.js"
import makeToken from "../utils/makeToken.js"

const userData = (obj) => (
    {
        _id: obj._id,
        name: obj.name,
        email: obj.email,
        isAdmin: obj.isAdmin
    }
)

// @desc    User login & send token
// @route   POST /api/users/login
// @access  Public
const userLogin = handleAsync(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && await user.matchPassword(password)) {
        makeToken(res, user._id)
        res.status(202).json(userData(user))
    } else {
        throw new AppError(401, "Invalid email or password")
    }
})

// @desc    User logout
// @route   GET /api/users/logout
// @access  Private
const userLogout = handleAsync(async (req, res) => {
    res.cookie("jwt", "", {
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict"
    })
    delete req.user
    res.status(200).json({ message: "Logged out" })
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const userRegister = handleAsync(async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        throw new AppError(400, "user with email exists")
    }
    const newUser = new User({ name, email, password })
    await newUser.save()
    makeToken(res, newUser._id)
    res.status(201).json(userData(newUser))
})

// @desc    User profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = handleAsync(async (req, res) => {
    res.status(200).json(userData(req.user))
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = handleAsync(async (req, res) => {
    const { name, email, password } = req.body
    const user = await User.findById(req.user._id)
    user.name = name || user.name
    user.email = email || user.email
    if (password) { user.password = password }
    const updatedUser = await user.save()
    res.status(200).json(userData(updatedUser))
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = handleAsync(async (req, res) => {
    const users = await User.find({}).deleteUser
    res.status(200).send(users.map(user => userData(user)))
})

// @desc    Get one user by id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = handleAsync(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        res.status(200).json(userData(user))
    } else {
        throw new AppError(404, "No such user")
    }
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = handleAsync(async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    if (user) {
        await user.deleteOne()
        res.status(200).json({ "message": `user #${id} deleted` })
    } else {
        throw new AppError(404, "No such user")
    }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = handleAsync(async (req, res) => {
    const { name, email, password, isAdmin } = req.body
    const user = await User.findById(req.params.id)
    user.name = name || user.name
    user.email = email || user.email
    user.isAdmin = isAdmin || user.isAdmin
    if (password) { user.password = password }
    const updatedUser = await user.save()
    res.status(200).json(userData(updatedUser))
})

export {
    userLogin, userLogout, userRegister, getUserProfile, updateUserProfile,
    getUsers, getUserById, deleteUser, updateUser //admin
}
