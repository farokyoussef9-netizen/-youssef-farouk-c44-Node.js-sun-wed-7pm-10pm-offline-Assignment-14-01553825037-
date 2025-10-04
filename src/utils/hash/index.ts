import bcrypt from "bcryptjs";
export const generatehashPassword=async(password:string)=>{
    return await bcrypt.hash(password,10)
}

export const comparepassword=async(password:string,hashPassword:string)=>{
    return await bcrypt.compare(password,hashPassword)
}