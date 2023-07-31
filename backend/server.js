import express from "express"
import { notFound, handleError } from "./middleware/handleError.js"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"

connectDB()
const app = express()
app.use(cors())

app.use("/api/products", productRoutes)

app.use(notFound)
app.use(handleError)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Express listening on port ${PORT}`)
})