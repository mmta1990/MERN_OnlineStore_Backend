/* eslint-disable no-unused-vars */
import AbstractCouponHandler from '../AbstractCouponHandler'
import IUser from 'src/components/users/model/IUser'
import ICoupon from 'src/components/coupon/model/ICoupon'

class ExpireHandler extends AbstractCouponHandler {
  public process (coupon: ICoupon, user: IUser): ICoupon | null {
    const now = new Date()
    if (now > coupon.expiresAt) {
      throw new Error('مدت زمان استفاده از این کد تخفیف به پایان رسیده است')
    }
    return super.process(coupon, user)
  }
}
export default ExpireHandler
