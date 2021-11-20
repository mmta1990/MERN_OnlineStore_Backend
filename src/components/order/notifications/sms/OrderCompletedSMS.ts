import ISMSMessage from "../../../../services/notification/sms/contarcts/ISMSMessgae"

export default class OrderCompletedSMS implements ISMSMessage{
    public readonly to:string
    public readonly messgae:string
    constructor(to:string,orderID:string){
        this.to = to
        this.messgae = `  شناسه با کاربر گرامی سفارش شما با ${orderID} موفقیت پرداخت شد.`
    }

}