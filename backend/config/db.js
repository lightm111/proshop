import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const c = await mongoose.connect(process.env.MONGO_URI, { family: 4 })
        console.log(`Connected to mongodb on URI: ${c.connection.host}`)
    } catch (e) {
        console.log(`Mongodb error: ${e.message}`)
        process.exit(1)
    }
}
export default connectDB