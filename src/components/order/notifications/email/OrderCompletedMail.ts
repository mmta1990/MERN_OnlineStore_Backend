import IMailMessage from "../../../../services/notification/mailer/contratcs/IMailMessage"

export default class OrderCompletedMail implements IMailMessage{
    public readonly receipent:string
    public readonly body:string
    public readonly subject:string
    constructor(receipent:string,orderID:string){
        this.receipent = receipent
        this.subject = 'پرداخت سفارش'
        this.body = `  شناسه با کاربر گرامی سفارش شما با ${orderID} موفقیت پرداخت شد.`
    }

}