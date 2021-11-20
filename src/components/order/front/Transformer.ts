/* eslint-disable no-unused-vars */
import ITransformer from '../../contracts/ITransformer'
import IOrder from '../model/IOrder'
import DateService from '../../../services/DateService'
export default class OrderTransformer implements ITransformer<IOrder> {
    private readonly dateService:DateService
    constructor () {
      this.dateService = new DateService()
    }

    public transform (item:IOrder) {
      return {
        id: item._id,
        totalPrice: item.totalPrice,
        finalPrice: item.finalPrice,
        orderLines: item.orderLines,
        deliveryAddress: item.deliveryAddress,
        createdAt: this.dateService.toPersian(item.createdAt.toUTCString()),
        updatedAt: this.dateService.toPersian(item.updatedAt.toUTCString()),
        status: item.status
      }
    }

    public collection (items:IOrder[]) {
      return items.map((item:IOrder) => this.transform(item))
    }

    private getUser (user:any) {
      if (!user) {
        return null
      }
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    }

    private getCoupon (coupon:any) {
      if (!coupon) {
        return null
      }
      return {
        code: coupon.code,
        percent: coupon.percent
      }
    }
}
