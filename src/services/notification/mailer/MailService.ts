import IMailer from "./contratcs/IMailer";
import IMailMessage from "./contratcs/IMailMessage";
import MailTrap from "./providers/MailTrap";

export default class MailService implements IMailer{
    private readonly defaultProvider:IMailer
    constructor(){
        this.defaultProvider = new MailTrap()
    }
    public send(message:IMailMessage):void{
        if(message.receipent != ''){
            this.defaultProvider.send(message)
        }
    }
}