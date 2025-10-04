import { IAttachment } from "../../utils";

export interface PostDto{
    content:string;
    attachments?:IAttachment[];
}