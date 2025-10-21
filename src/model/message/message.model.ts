import { IMessage } from "../../utils";
import { messageSchema } from "./message.schema";
import { model } from "mongoose";
export const Message=model<IMessage>("Message",messageSchema);
