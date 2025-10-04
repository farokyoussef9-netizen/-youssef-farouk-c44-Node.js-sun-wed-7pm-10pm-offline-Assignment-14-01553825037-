// بتحدد الداتا المسموحه لليوزر
import { GENDER } from "../../utils/common/enum";
export interface RegisterDto{
    fullname?:string;
       
        email:string;
        password:string;
       
        phone?:string;
   
    gender:GENDER;
    
}
export interface VerifyAccountDto{
    email:string;
    otp:string;
}
export interface LoginDto{
    email:string;
    password:string;
}

