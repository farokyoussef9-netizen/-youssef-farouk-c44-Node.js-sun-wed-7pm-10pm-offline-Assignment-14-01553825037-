import {Server as HttpServer} from "http";
import {Server,Socket} from "socket.io";
import { authMiddleware } from "./middleware";
import { MessageRepository } from "../model/message/message.rebository";
import { ChatRepository } from "../model/chat/chat.rebository";
const userconnections=new Map<string,string>();
export const initsocket=(server:HttpServer)=>{
const io=new Server(server,{cors:{origin:"*"}});
io.use(authMiddleware)
io.on("connection",async(socket:Socket)=>{
   
    userconnections.set(socket.data.user.id, socket.id);
    socket.on("sendMessage",async(data:{message:string,destid:string})=>{
        const destsocket=userconnections.get(data.destid);//.عشان ارجع اا socketid بتاعه
socket.emit("successMessage",data);
io.to(destsocket as string).emit("receiveMessage",data)
//save in db
//create message
const messageRepository:MessageRepository=new MessageRepository();
 const createdmessage=await messageRepository.create({
    sender:socket.data.user.id,
    message:data.message,
    
})
const chatRepository=new ChatRepository();
const chat= await chatRepository.getone({users:{$all:[socket.data.user.id,data.destid]}});
//if chat not exist create it
if(!chat){
    chatRepository.create({users:[socket.data.user.id,data.destid],messages:[createdmessage._id]})
}
//else update it
else{
    chatRepository.update({users:{$all:[socket.data.user.id,data.destid]}},{messages:{$push:createdmessage._id}})
}
    })
})
}