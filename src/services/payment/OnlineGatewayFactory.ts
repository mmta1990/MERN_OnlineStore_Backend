import ServerException from "../../components/exceptions/ServerException";
import OnlineGateway from "./contracts/OnlineGateway";
import ZarinPal from './online/ZarinPal'
export default class OnlineGatewayFactory{
    private gateways:Map<string,OnlineGateway> = new Map<string,OnlineGateway>()
    constructor(){
        this.gateways.set('zarinpal',new ZarinPal)
    }
    public make(gateway:string):OnlineGateway{
        if(!this.gateways.has(gateway)){
            throw new ServerException('درگاه آنلاین معتبر نیست')
        }
        return this.gateways.get(gateway) as OnlineGateway
    }

}