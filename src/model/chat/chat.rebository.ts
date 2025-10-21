import AbstractRepository from "../../DB/AbstractRepository";
import { IChat } from "../../utils/common/iterfaces";
import { Chat } from "./chat.model";


export class ChatRepository extends AbstractRepository<IChat>{
    constructor(){
        super(Chat)
    }
}