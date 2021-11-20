import ISMSMEssage from "./ISMSMessgae";

export default interface ISMSProvider{
    send(message:ISMSMEssage):void
}