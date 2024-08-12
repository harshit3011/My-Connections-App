import mongoose from "mongoose";


const connectDB=async()=>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
        console.log(`\nMONGO DB is connected!! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`\nError in connecting MONGODB:`,error)
        process.exit(1)
    }
}

export default connectDB