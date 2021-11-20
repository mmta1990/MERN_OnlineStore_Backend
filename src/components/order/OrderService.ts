import NotFoundException from '../exceptions/NotFoundException'
import IOrder from './model/IOrder'
import OrderStatus from './model/OrderStatus'
import IOrderRepository from './repositories/IOrderRepository'
import OrderMongoRepository from './repositories/OrderMongoRepository'
import StatusVerifier from './services/StatusVerifier'
import IBasketItem from "../basket/IBasketItem";
import SMSService from '../../services/notification/sms/SMSService'
import MailService from '../../services/notification/mailer/MailService'
import OrderCompletedSMS from './notifications/sms/OrderCompletedSMS'
import IUser from '../users/model/IUser'
import OrderCompletedMail from './notifications/email/OrderCompletedMail'
import User from '../users/model/User'
export default class OrderService {
    private readonly statusVerifier:StatusVerifier
    private readonly orderRepository:IOrderRepository
    private readonly smsService:SMSService
    private readonly mailService:MailService
    constructor () {
      this.orderRepository = new OrderMongoRepository()
      this.statusVerifier = new StatusVerifier()
      this.mailService = new MailService()
      this.smsService = new SMSService()
    }

    public async updateStatus (orderID:string, newStatus:OrderStatus):Promise<boolean> {
      const order:IOrder | null = await this.orderRepository.findOne(orderID)
      if (!order) {
        throw new NotFoundException('سفارش مورد نظر یافت نشد')
      }
      const canStartTransition:boolean = this.statusVerifier.verify(newStatus, order.status)
      if (!canStartTransition) {
        throw new Error('انجام این تغییر وضعیت امکان پذیر نمی باشد')
      }
      return this.orderRepository.updateOne({ _id: orderID }, { status: newStatus })
    }

    public async addOrder(orderData:any):Promise<IOrder | boolean>{
        const newOrder = await this.orderRepository.create({
          user:orderData.user_id,
          totalPrice:orderData.items
          .reduce((total:number,item:IBasketItem) => (total + (item.price * item.count)),0),
          finalPrice:orderData.items
          .reduce((total:number,item:IBasketItem) => (total + (item.discountedPrice * item.count)),0),
          orderLines:orderData.items.map((item:IBasketItem) => ({
            product:item.productID,
            price:item.price,
            discountedPrice:item.discountedPrice,
            count:item.count
          })),
          deliveryAddress:orderData.delivery_address,
          coupon:orderData.coupon.code
        })
        if(newOrder){
          return newOrder
        }
        return false
    }
    public async completeOrder(orderID:string):Promise<void>{
      const order = await this.orderRepository.findOne(orderID,['user'])
      this.updateStatus(orderID,OrderStatus.PAID_IN_PROGRESS)
      const user:any = order?.user 
      let userMobile = '';
      let userEmail = '';
      if(user instanceof User){
        userMobile = user.mobile
        userEmail = user.mobile
      }
      this.smsService.send(new OrderCompletedSMS(userMobile,orderID))
      this.mailService.send(new OrderCompletedMail(userEmail,orderID))
    }
}
