import IPayment from "../../../components/payment/model/IPayment";
import IPaymentRequest from "../contracts/IPaymentRequest";
import IPaymentVerify from "../contracts/IPaymentVerify";
import OnlineGateway from "../contracts/OnlineGateway";
import PaymentMethod from "../contracts/PaymentMethod";
import OnlineGatewayFactory from "../OnlineGatewayFactory";
export default class OnlinePayment implements PaymentMethod{
    private gateway:string= ''
    private readonly onlineGatewayFactory:OnlineGatewayFactory
    constructor(){
        this.onlineGatewayFactory = new OnlineGatewayFactory()
    }
    public async doPayment(payment:IPayment):Promise<any>{
        const onlineGateway = this.onlineGatewayFactory.make(this.gateway)
        const paymentReqeust:IPaymentRequest = {
            amount:payment.amount,
            description:`بابت پرداخت آنلاین سفارش به شماره ${payment.order}`,
            reserve:payment.reserve
        }
        return onlineGateway.paymentRequest(paymentReqeust)
    }
    public setGateway(gateway:string){
        this.gateway = gateway
    }

    public async verifyPayment(clientPaymentData:any):Promise<{success:boolean,refID?:string}>{
        const onlineGateway = this.onlineGatewayFactory.make(this.gateway)
        const paymentVerifyData:IPaymentVerify = {
            amount:clientPaymentData.amount,
            refID:clientPaymentData.autority,
            status:clientPaymentData.status,
        }
        return onlineGateway.paymentVerify(paymentVerifyData)
    }

    
}