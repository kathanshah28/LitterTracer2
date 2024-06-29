import mongoose from "mongoose";
import { DB_NAME } from "../Constants/constants.js";

const connectDB = async () => {
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("connection succesfull.")
    } catch (error) {
        console.log("connection to mongoDb atlas database failed.",error)
        process.exit(1)
    }
}

export {connectDB}