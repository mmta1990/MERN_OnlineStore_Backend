/* eslint-disable no-unused-vars */
import ITransformer from '../contracts/ITransformer'
import IShipment from './models/IShipment'
import DateService from '../../services/DateService'

export default class ShipmentTransformer implements ITransformer<IShipment> {
    private readonly dateService:DateService
    constructor () {
      this.dateService = new DateService()
    }

    public transform (item:IShipment) {
      return {
        id: item._id,
        employee: this.getEmployee(item.employee),
        order: {
          id: this.getOrder(item.order)
        },
        selectedDateTime: this.dateService.toPersian(item.selectedDateTime.toUTCString()),
        deliveredAt: this.dateService.toPersian(item.deliveredAt.toUTCString()),
        note: item.note,
        status: item.status
      }
    }

    public collection (items:IShipment[]) {
      return items.map((item:IShipment) => this.transform(item))
    }

    private getEmployee (user:any) {
      if (!user) {
        return null
      }
      return {
        firstName: user.firstName,
        lastName: user.lastName
      }
    }

    private getOrder (order:any) {
      return order._id
    }
}
