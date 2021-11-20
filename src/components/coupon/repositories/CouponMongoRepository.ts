/* eslint-disable no-unused-vars */
import ICouponRepository from './ICouponRepository'
import CouponModel from '../model/Coupon'
import ICoupon from '../model/ICoupon'
export default class CouponMongoRepository implements ICouponRepository {
  public async findOne (ID:string):Promise<ICoupon | null> {
    return CouponModel.findById(ID)
  }

  public async findMany (params:any):Promise<ICoupon[]> {
    return CouponModel.find(params)
  }

  public async create (params:any):Promise<ICoupon> {
    const newCoupon = new CouponModel({ ...params })
    return newCoupon.save()
  }

  public async updateOne (where:Partial<ICoupon>, updateData:Partial<ICoupon>):Promise<boolean> {
    return CouponModel.updateOne(where, updateData)
  }

  public async updateMany (where:any, updateData:any):Promise<any> {}
  public async deleteOne (where:any):Promise<any> {}
  public async deleteMany (where:any):Promise<any> {}

  public async findByCode (code:string):Promise<ICoupon | null> {
    return CouponModel.findOne({ code })
  }
}
