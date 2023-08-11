import express from "express"
import cookieParser from "cookie-parser"
import { notFound, handleError } from "./middleware/handleError.js"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"

connectDB()
const app = express()

// CORS enabled
app.use(cors())

//Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cookie parser
app.use(cookieParser())

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)

app.use(notFound)
app.use(handleError)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Express listening on port ${PORT}`)
})