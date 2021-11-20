/* eslint-disable no-unused-vars */
import IUser from 'src/components/users/model/IUser'
import ICoupon from 'src/components/coupon/model/ICoupon'
import UserHandler from './handlers/UserHandler'
import LimitHandler from './handlers/LimitHandler'
import ExpireHandler from './handlers/ExpireHandler'

class CouponValidator {
  public handle (coupon: ICoupon, user?: IUser) {
    const userHandler = new UserHandler()
    const limitHandler = new LimitHandler()
    const expireHandler = new ExpireHandler()
    userHandler.setNext(limitHandler).setNext(expireHandler)
    return userHandler.process(coupon, user)
  }
}

export default CouponValidator
