import IMailMessage from "./IMailMessage";
import IMessage from "./IMailMessage";

export default interface IMailer{
    send(message:IMailMessage):void
}