/* eslint-disable no-unused-vars */
import ICoupon from 'src/components/coupon/model/ICoupon'
import IUser from 'src/components/users/model/IUser'

export default interface CouponHandler {
    setNext(handler: CouponHandler): CouponHandler;
    process(coupon: ICoupon, user?: IUser): ICoupon | null;
}
