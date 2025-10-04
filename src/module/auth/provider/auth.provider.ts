import { UserRebository } from "../../../model/user/user.Rebository"
import { BadRequestException, NotFoundException } from "../../../utils"
import { VerifyAccountDto } from "../auth.dto"

const authProvider={
   async cheachotb(verifyAccountDto: VerifyAccountDto){
        const userRebository=new UserRebository();
        const user=await userRebository.exist({email:verifyAccountDto.email})
    if(!user){
        throw new NotFoundException("User not found")
    }
    if(user.Otp!=verifyAccountDto.otp){
        throw new BadRequestException("Invalid OTP")
    }
    if((user.OtpExpiry as Date) <new Date()){
        throw new BadRequestException("OTP expired")
    }
    }
}
export default authProvider

