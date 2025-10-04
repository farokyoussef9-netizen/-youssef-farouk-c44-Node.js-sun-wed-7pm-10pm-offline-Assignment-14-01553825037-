import z from "zod";
import { RegisterDto } from "./auth.dto";
import { GENDER ,USER_AGENT} from "../../utils";
export const registerSchema=z.object<RegisterDto>({
fullname:z.string().min(2).max(20) as unknown as string,
email:z.email() as unknown as string,
password:z.string().min(6).max(20) as unknown as string,
gender:z.enum(GENDER) as unknown as GENDER,
phone:z.string().min(11).max(11) as unknown as string,

})