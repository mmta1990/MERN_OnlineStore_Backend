import IMailer from "../contratcs/IMailer";
import IMailMessage from "../contratcs/IMailMessage";
import { createTransport,Transport } from "nodemailer";
export default class MailTrap implements IMailer {
    private smtpTransport:any
    constructor(){
        this.smtpTransport = createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "082baa63a67b25",
                pass: "5984daaa51bbfb"
            }
        })
    }
    public send(message:IMailMessage):void{
        this.smtpTransport.sendMail({
            from:'keivan.amohamadi@gmail.com',
            to:message.receipent,
            subject:message.subject,
            text:message.body
        })
    }
}