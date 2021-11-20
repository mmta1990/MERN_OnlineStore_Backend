import ISMSMessage from "./contarcts/ISMSMessgae";
import ISMSProvider from "./contarcts/ISMSProvider";
import SIBSMS from "./providers/SIBSMS";

export default class SMSService implements ISMSProvider{
    private readonly defaultProvider:ISMSProvider
    constructor(){
        this.defaultProvider = new SIBSMS()
    }
    public send(message:ISMSMessage):void{
        if(message.to != ''){
            this.defaultProvider.send(message)
        }
    }
}