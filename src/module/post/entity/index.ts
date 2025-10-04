import { IAttachment, IReaction } from "../../../utils";
import {ObjectId} from "mongoose";
export class post{
    userid!:ObjectId;    
    content!:string;
    reactions!:IReaction[];
    attachments?:IAttachment[];
}