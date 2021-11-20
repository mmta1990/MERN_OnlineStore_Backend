import IPaymentRepository from "../../components/payment/repositories/IPaymentRepository";
import IOrder from "../../components/order/model/IOrder";
import PaymentMongoRepository from "../../components/payment/repositories/PaymentMongoRepository";
import { v4 as uuid } from "uuid";
import PaymentMethodFactory from "./PaymentMethodFactory";
import OnlinePayment from "./methods/OnlinePayment";
import NotFoundException from "../../components/exceptions/NotFoundException";
import OnlineGatewayFactory from "./OnlineGatewayFactory";
import IPaymentVerify from "./contracts/IPaymentVerify";
export default class PaymentService {
    private readonly paymentRepository:IPaymentRepository
    private readonly paymentMethodFactory:PaymentMethodFactory
    private readonly onlineGatewayFactory:OnlineGatewayFactory

    constructor(){
        this.paymentRepository = new PaymentMongoRepository()
        this.paymentMethodFactory = new PaymentMethodFactory()
        this.onlineGatewayFactory = new OnlineGatewayFactory()

    }
    public async payOrder(order:IOrder,method:string){
        const newPayment = await this.paymentRepository.create({
            user:order.user,
            order:order._id,
            amount:order.finalPrice,
            method,
            reserve:uuid()
        })
        const paymentProvider = this.paymentMethodFactory.make('online')
        if(paymentProvider instanceof OnlinePayment){
            paymentProvider.setGateway(method)
        }
        return paymentProvider.doPayment(newPayment)
    }
    public async verifyPayment(paymentVerifyData:any):Promise<{success:boolean,refID?:string}>{
        const payment = await this.paymentRepository.findByReserve(paymentVerifyData.reserve)
        if(!payment){
            throw new NotFoundException('هیچ پرداختی با این شناسه وجود ندارد')
        }
        const onlineGatewayProvider = this.onlineGatewayFactory.make(payment.method)
        const verifyData:IPaymentVerify = {
            amount:payment.amount,
            refID:paymentVerifyData.authority,
            status:paymentVerifyData.status
        }
        return onlineGatewayProvider.paymentVerify(verifyData)
    }
}   