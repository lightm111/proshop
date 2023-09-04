import path from "path"
import express from "express"
import cookieParser from "cookie-parser"
import { notFound, handleError } from "./middleware/handleError.js"
import "dotenv/config"
import cors from "cors"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"

const app = express()

// CORS enabled
app.use(cors({
    origin: process.env.NODE_ENV === "development" ? process.env.CLIENT_URL : "*",
    credentials: true // Allow cookies to be sent and received
}))

//Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cookie parser
app.use(cookieParser())

// Routes
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)

// PayPal
app.get("/api/config/paypal", (req, res) =>
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
)

// access /uploads
const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

// For production
if (process.env.NODE_ENV !== "development") {
    app.use(express.static(path.join(__dirname, "frontend/build")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    })
}

app.use(notFound)
app.use(handleError)

const PORT = process.env.PORT || 3001

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Express listening on port ${PORT}`)
    })
})