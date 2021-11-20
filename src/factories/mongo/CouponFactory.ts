/* eslint-disable no-unused-vars */
import * as faker from 'faker'
import ICoupon from '../../components/coupon/model/ICoupon'
import CouponModel from '../../components/coupon/model/Coupon'
import CouponStatus from '../../components/coupon/model/CouponStatus'
// faker.setLocale('fa')
export async function create (count:number = 1, params?:Partial<ICoupon>) {
  const coupons:ICoupon[] = []
  for (let index = 1; index <= count; index++) {
    const defaultParams = {
      code: faker.random.alphaNumeric(10),
      percent: faker.random.number(99) + 1,
      limit: faker.random.number(100) + 1,
      used: 0,
      expiresAt: faker.date.future().toLocaleDateString(),
      constraints: {},
      status: faker.random.arrayElement([CouponStatus.ACTIVE, CouponStatus.INACTIVE])
    }
    const couponParams = { ...defaultParams, ...params }
    const newCoupon = new CouponModel(couponParams)
    await newCoupon.save()
    coupons.push(newCoupon)
  }
  return coupons
}
