import AbstractRepository from "../../DB/AbstractRepository";
import {  IMessage } from "../../utils/common/iterfaces";
import { Message } from "./message.model";



export class MessageRepository extends AbstractRepository<IMessage>{
    constructor(){
        super(Message)
    }
}