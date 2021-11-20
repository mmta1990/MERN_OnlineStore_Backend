/* eslint-disable no-unused-vars */
import AbstractCouponHandler from '../AbstractCouponHandler'
import IUser from 'src/components/users/model/IUser'
import ICoupon from 'src/components/coupon/model/ICoupon'

class LimitHandler extends AbstractCouponHandler {
  public process (coupon: ICoupon, user?: IUser): ICoupon | null {
    if (coupon.used >= coupon.limit) {
      throw new Error('تعداد استفاده از این کد تخفیف به پایان رسیده است')
    }
    return super.process(coupon, user)
  }
}
export default LimitHandler
