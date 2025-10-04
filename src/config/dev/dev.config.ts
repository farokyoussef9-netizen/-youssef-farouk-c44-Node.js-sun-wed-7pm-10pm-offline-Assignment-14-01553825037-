import { config } from "dotenv";
config();
export const devConfig={
    DB_URL:process.env.DB_URL,
PORT:process.env.PORT,



  CLOUD_NAME:process.env.CLOUD_NAME,
    API_KEY:process.env.API_KEY,
    API_SECRET:process.env.API_SECRET,


EMAIL_USER:process.env.EMAIL_USER,
EMAIL_PASSWORD:process.env.EMAIL_PASSWORD,
JWT_SECRET:process.env.JWT_SECRET,
}