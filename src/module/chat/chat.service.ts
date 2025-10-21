import { ChatRepository } from "../../model/chat/chat.rebository";
import { Request, Response } from "express";
import { NotFoundException } from "../../utils";
class ChatService{
   private  readonly chatRepository:ChatRepository=new ChatRepository();
    constructor(){
    
    }
    getChat=async(req:Request,res:Response)=>{
        const{userid}=req.params;
const userlogin=req.user?._id;
const chat=await this.chatRepository.getone({users:{$all:[userlogin,userid]}},{},{populate:[{path:"messages"}]});
if(!chat){
    throw new NotFoundException("chat not found");
}
return res.status(200).json({
    success:true,
    message:"chat found",
    data:chat
});
    }
}
export default ChatService;
