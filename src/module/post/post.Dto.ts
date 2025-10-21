import { IAttachment } from "../../utils";

export interface PostDto{
    content:string;
    mentions?:string[];
    attachments?:IAttachment[];
}