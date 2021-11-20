/* eslint-disable no-unused-vars */
import ITransformer from '../../contracts/ITransformer'
import ICoupon from '../model/ICoupon'
import DateService from '../../../services/DateService'

export default class CouponTransformer implements ITransformer<ICoupon> {
    private readonly dateService:DateService
    constructor () {
      this.dateService = new DateService()
    }

    public transform (item:ICoupon) {
      return {
        id: item._id,
        code: item.code,
        percent: item.percent,
        limit: item.limit,
        used: item.used,
        expiresAt: this.getExpiresAt(item.expiresAt),
        status: item.status
      }
    }

    private getExpiresAt (expiresAt: Date):string | null {
      if (!expiresAt) {
        return ''
      }
      return this.dateService.toPersian(expiresAt.toUTCString())
    }

    public collection (items:ICoupon[]) {
      return items.map((item:ICoupon) => this.transform(item))
    }
}
