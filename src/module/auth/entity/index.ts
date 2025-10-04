import { SYS_ROLE } from "../../../utils/common/enum";
import { GENDER } from "../../../utils/common/enum";
import { USER_AGENT } from "../../../utils/common/enum";
export class User{
  public fullname!:string;
  public firstname!:string;
  public lastname!:string;
  public email!:string;
  public password!:string;
  public creaditionalupdateat!:Date;
  public phone!:string;
  public role!:SYS_ROLE;
  public gender!:GENDER;
  public userAgent!: USER_AGENT;
  public Otp!:string;
  public OtpExpiry!:Date;
  public isVerified!:boolean;
}