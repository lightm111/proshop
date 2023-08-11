import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSch = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

userSch.methods.matchPassword = async function (plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password)
}

const User = mongoose.model("User", userSch)
export default User