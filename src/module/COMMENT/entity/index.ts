import { ObjectId } from "mongoose";
import { IAttachment } from "../../../utils";
import { IReaction } from "../../../utils/common/iterfaces";
export class COMMENT{
 userid!:ObjectId;
  postid!:ObjectId;
  parentid?:ObjectId|null;
  attachments?:IAttachment[];
  content!:string;
  reactions?:IReaction[];
}