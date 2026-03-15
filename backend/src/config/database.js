import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const connectioInstance = await mongoose.connect
        (`${process.env.MONGODB_URI}`)
        console.log(`\n MongoDB Connected !!!
        ${connectioInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection failed" , error);
        process.exit(1)
        
    }
}
export default connectDB;