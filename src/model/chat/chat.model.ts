import { IChat } from "../../utils";
import { chatSchema } from "./chat.schema";
import { model } from "mongoose";
export const Chat=model<IChat>("Chat",chatSchema);
