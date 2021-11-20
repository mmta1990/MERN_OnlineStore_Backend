/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import ITransformer from '../../contracts/ITransformer'
import CouponTransformer from './CouponTransformer'
import CouponMongoRepository from '../repositories/CouponMongoRepository'
import ICouponRepository from '../repositories/ICouponRepository'

export default class CouponsController {
    private readonly couponsRepository:ICouponRepository
    private readonly transformer:CouponTransformer
    constructor () {
      this.couponsRepository = new CouponMongoRepository()
      this.transformer = new CouponTransformer()
      this.index = this.index.bind(this)
      this.store = this.store.bind(this)
    }

    public async index (req:Request, res:Response, next:NextFunction) {
      const coupons = await this.couponsRepository.findMany({})
      res.send(this.transformer.collection(coupons))
    }

    public async store (req:Request, res:Response, next:NextFunction) {
      try {
        const newCoupon = await this.couponsRepository.create({
          code: req.body.code,
          percent: req.body.percent,
          limit: req.body.limit,
          expiresAt: req.body.expiresAt,
          constraints: req.body.constraints
        })
        if (newCoupon) {
          res.send({
            success: true,
            message: 'کد تخفیف با موفقیات ایجاد شد'
          })
        }
      } catch (error) {
        next(error)
      }
    }
}
