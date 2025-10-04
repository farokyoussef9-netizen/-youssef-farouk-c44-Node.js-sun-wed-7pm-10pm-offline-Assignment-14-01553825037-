import mongoose from "mongoose"
import { devConfig } from "../config/dev/dev.config"
export const connectDB=async()=>{
await mongoose.connect(devConfig.DB_URL as string).then(()=>{
    console.log("db connected successfully")
}).catch((err)=>{
console.log("faild to connect db",err)
})
}