import { verifyToken } from "../../utils/Token";
import { UserRebository } from "../../model";
import { Socket } from "socket.io";
import { NotFoundException } from "../../utils";
export const authMiddleware=async(socket:Socket,next:Function)=>{
try {
    const {authrization}=socket.handshake.auth;
   const payload= verifyToken(authrization);
   const userRebository=new UserRebository();
   const user=await userRebository.getone({_id:payload.id});
   if(!user){
    throw new NotFoundException("user not found");
   }
   socket.data.user=user;
   next();
} catch (error) {
    next(error);
}
}