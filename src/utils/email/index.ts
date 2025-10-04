import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { devConfig } from "../../config/dev/dev.config";
export const sendEmail=async(mailOptions:MailOptions)=>{
    const transporter=nodemailer.createTransport({
      service: "gmail",
        
        auth: {
            user: devConfig.EMAIL_USER,
            pass: devConfig.EMAIL_PASSWORD,
        },
    })
    ///عشان هو obj عدلت عليع وعملت فيه from
    mailOptions.from=`Social-App<${devConfig.EMAIL_USER}>`
    await transporter.sendMail(mailOptions);
}