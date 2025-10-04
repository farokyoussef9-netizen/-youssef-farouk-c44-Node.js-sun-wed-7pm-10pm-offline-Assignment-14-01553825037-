import { RegisterDto } from "../auth.dto"; 
import { User } from "../entity";
import { USER_AGENT } from "../../../utils/common/enum";
import { SYS_ROLE } from "../../../utils/common/enum";
import { generateOTP,generateExpiryDate } from "../../../utils/OTP";
import { generatehashPassword } from "../../../utils/hash";
//prepare data
 export class AUTHFactory{
     async register(registerDto:RegisterDto){
        const user=new User()
        user.fullname=registerDto.fullname as string
       
        user.email=registerDto.email as string
        user.password= await generatehashPassword(registerDto.password);
        user.phone=registerDto.phone as string
        user.gender=registerDto.gender ;
        user.userAgent=USER_AGENT.local
        user.role=SYS_ROLE.user
        user.Otp=generateOTP()
        user.OtpExpiry=generateExpiryDate(5*60*60*1000);     
        user.creaditionalupdateat=new Date();
        user.isVerified=false;
return user;
    }
 }
 