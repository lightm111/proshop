import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import products from "./data/products.js"
import connectDB from "./config/db.js"

connectDB()
const app = express()
app.use(cors())

app.get("/api/products", (req, res) => {
    res.json(products)
})

app.get("/api/product/:id", (req, res) => {
    const { id } = req.params
    const product = products.find(p => p._id === id)
    res.json(product)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Express listening on port ${PORT}`)
})