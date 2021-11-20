import ISMSMessage from "../contarcts/ISMSMessgae";
import ISMSProvider from "../contarcts/ISMSProvider";
import * as https from 'https'
export default class SIBSMS implements ISMSProvider{
    public send(message:ISMSMessage):void{
        const userName:string='4a654sd5as'
        const password:string = 'asd5as4da45sd'
        const number:string = '3000500010005632'
        const url:string = `https://www.sibsms.com/APISend.aspx?Username=${userName}&Password=${password}&From=${number}&To=${message.to}&Text=${message.messgae}`
        https.get(url,res => {})
    }
}