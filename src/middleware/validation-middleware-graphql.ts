import { ZodType } from "zod";
import { BadRequestException } from "../utils";

export const isvalid=(schema:ZodType,args:any)=>{
 
        const data={
    args
        }
    const validateData=schema.safeParse(data);
    if(!validateData.success){
        let errmessages=validateData.error.issues.map((issue)=>({
            path:issue.path[0] as string,
            message:issue.message,
           
        }));
        throw new BadRequestException("validation error",errmessages);
    }
  

}
