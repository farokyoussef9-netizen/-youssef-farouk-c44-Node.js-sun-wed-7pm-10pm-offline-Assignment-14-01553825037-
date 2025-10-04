import { postSchema } from "./post.schema";
import { model } from "mongoose";
export const Post=model("Post",postSchema);
export default Post;
