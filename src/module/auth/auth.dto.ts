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
export interface UpdatePasswordDto{
    email:string;
    password:string;
    newPassword:string;
}
export interface UpdateEmailDto{
    email:string;
    password:string;
    newEmail:string;
}

export interface UpdatebasicDto{
    email:string;
    password:string;
   newfullname?:string;
   newphone?:string;
   
}