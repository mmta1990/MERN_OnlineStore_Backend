/* eslint-disable no-unused-vars */
import ITransformer from '../../contracts/ITransformer'
import IUser from '../model/IUser'
import DateService from '../../../services/DateService'
export default class UserTransformer implements ITransformer<IUser> {
    private readonly dateService:DateService
    constructor () {
      this.dateService = new DateService()
    }

    public transform (item:IUser) {
      return {
        id: item._id,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        mobile: item.mobile,
        ordersCount: item.totalOrders,
        wallet: item.wallet,
        address: item.addresses,
        createdAt: this.dateService.toPersian(item.createdAt.toUTCString())
      }
    }

    public collection (items:IUser[]) {
      return items.map((item:IUser) => this.transform(item))
    }
}
