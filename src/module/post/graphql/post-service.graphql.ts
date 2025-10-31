import { PostRebository } from "../../../model";
import { isAuthenticatedgraohql } from "../../../middleware/auth-graphql";
import { isvalid } from "../../../middleware/validation-middleware-graphql";
import { postSchema } from "./post-schema";
export const getsbasificpost=async(_: unknown, args: { _id: string },context:any)=>{
    //imblment auth 
    //graphql مفيهوش middleware 
   await isAuthenticatedgraohql(context);
   //implment validation
    isvalid(postSchema,args);
    const postrepo=new PostRebository();
    const post=await postrepo.getone({_id:args._id},{},{populate:[{path:"userid"}]});
    //لومعملناش await Post ={} مش null
if(!post){
    throw new Error("post not found")
}
return{// uniqe format response
    message:"done",
    success:true,
    data:post
}
}

    export const getallpost=async(_: unknown, args: { _id: string })=>{
    const postrepo=new PostRebository();
    const post=await postrepo.getall({},{},{populate:[{path:"userid"}]});
    //لومعملناش await Post ={} مش null
if(!post){
    throw new Error("post not found")
}
return{// uniqe format response
    message:"done",
    success:true,
    data:post
}
}
