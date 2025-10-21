import { Timestamp } from "bson";
import { Schema } from "mongoose";
import{IUser} from "../../utils/common/iterfaces"
import { SYS_ROLE, USER_AGENT,GENDER } from "../../utils/common/enum";
import { sendEmail } from "../../utils/email";
export const userschema=new Schema<IUser>({
    // fullname:{type:String,},Vitual field
    firstname:{type:String,minLength:2,maxLength:20,required:true,trim:true},
    lastname:{type:String,minLength:2,maxLength:20,required:true,trim:true},
    email:{type:String,required:true,trim:true,lowercase:true,unique:true},
    password:{type:String,required:function () {
        if(this.userAgent==USER_AGENT.local){
            return true;
        }
        return false;
    }},
    creaditionalupdateat:{type:Date},
    phone:{type:String},
    role:{type:String, enum:SYS_ROLE,default:SYS_ROLE.user},
    gender:{type:String, enum:GENDER,default:GENDER.male},
    userAgent:{type:String, enum:USER_AGENT,default:USER_AGENT.local},
    Otp:{type:String},
    OtpExpiry:{type:Date},
    isVerified:{type:Boolean,default:false},
    friends:[{type:Schema.Types.ObjectId,ref:"User"}],
    requests:[{type:Schema.Types.ObjectId,ref:"User"}],
},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}}  )  
userschema.virtual("fullname").get(function (){
    return this.firstname+" "+this.lastname;
}).set(function (val){
    this.firstname=val.split(" ")[0] as string;
    this.lastname=val.split(" ")[1] as string;
})
//middleware mongoose  (hooks)>>pre,after
userschema.pre("save", async function (next){
    if(this.userAgent!=USER_AGENT.google&& this.isNew==true){
  await sendEmail({to:this.email,subject:"confirm account",html:`<h1> your otb is ${this.Otp}</h1>`})
    // next(new Error("KEFE KDA"));>>to global error handler
   //dont need write next to this function return promise}
    }

})