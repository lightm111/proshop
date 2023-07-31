import User from "./models/userModel.js"
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import users from "./data/users.js"
import products from "./data/products.js"
dotenv.config()
connectDB()

const destroyData = async () => {
    try {

        await Order.deleteMany({})
        await Product.deleteMany({})
        await User.deleteMany({})
        console.log("DB Cleaned")
        process.exit()
    } catch (e) {
        console.log(`DB Error: ${e.message}`)
        process.exit(1)
    }
}

const importData = async () => {
    try {
        await Order.deleteMany({})
        await Product.deleteMany({})
        await User.deleteMany({})
        await User.insertMany(users)
        const admin = await User.findOne({ name: "admin" })
        const productSamples = products.map(p => { return { ...p, user: admin } })
        await Product.insertMany(productSamples)
        console.log("Data imported")
        process.exit()
    } catch (e) {
        console.log(`DB Error: ${e.message}`)
        process.exit(1)
    }
}

if (process.argv[2] == "-d") destroyData()
else importData()