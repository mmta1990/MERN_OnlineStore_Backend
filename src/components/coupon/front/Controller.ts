/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import ValidationException from '../../exceptions/ValidationException'
import CouponValidator from '../../../services/coupon/couponValidator/CouponValidator'
import CouponMongoRepository from '../repositories/CouponMongoRepository'
import ICouponRepository from '../repositories/ICouponRepository'
import NotFoundException from '../../exceptions/NotFoundException'

export default class CouponsController {
    private readonly couponsRepository:ICouponRepository
    constructor () {
      this.couponsRepository = new CouponMongoRepository()
      this.validateCoupon = this.validateCoupon.bind(this)
    }

    public async validateCoupon (req:Request, res:Response, next:NextFunction) {
      const couponValidator = new CouponValidator()
      try {
        const { couponCode } = req.body
        if (!couponCode) {
          throw new ValidationException('کد تخفیف مورد نظر معتبر نمی  باشد')
        }
        const coupon = await this.couponsRepository.findByCode(couponCode)
        if (!coupon) {
          throw new NotFoundException('کد تخفیف مورد نظر معتبر نمی  باشد')
        }
        couponValidator.handle(coupon)
        res.send({
          success: true,
          message: 'کد تخفیف با موفقیت اعمال شد',
          coupon: {
            percent: coupon.percent,
            code: coupon.code
          }
        })
      } catch (error) {
        next(error)
      }
    }
}
