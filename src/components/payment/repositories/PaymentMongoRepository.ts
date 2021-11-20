/* eslint-disable no-unused-vars */
import IPaymentRepository from './IPaymentRepository'
import PaymentModel from '../model/Payment'
import PaymentStatus from '../model/PaymentStatus'
import IPayment from '../model/IPayment'
import ObjectInterface from '../../contracts/ObjectInterface'
import IUser from '../../users/model/IUser'
import IUserRepository from '../../users/repositories/IUserRepository'
import UserMongoRepository from '../../users/repositories/UserMongoRepository'
import IPagination from '../../contracts/IPagination'
export default class PaymentMongoRepository implements IPaymentRepository {
  private readonly userRepository:IUserRepository
  constructor () {
    this.userRepository = new UserMongoRepository()
  }

  public async findOne (ID:string):Promise<IPayment | null> {
    return PaymentModel.findById(ID)
  }
  public async findByReserve (reserve:string):Promise<IPayment | null> {
    return PaymentModel.findOne({reserve})
  }
  public async findMany (params:ObjectInterface, relations?:string[], pagination?:IPagination):Promise<IPayment[]> {
    const paymentQueryParams:ObjectInterface = {}
    if (params.user) {
      const users = await this.userRepository.findMany({
        $or: [
          { firstName: { $regex: params.user } },
          { lastName: { $regex: params.user } },
          { email: { $regex: params.user } }
        ]
      })
      paymentQueryParams.user = { $in: users.map((user:IUser) => user._id) }
    }
    const paymentQuery = PaymentModel.find(paymentQueryParams)
    if (relations && relations.length > 0) {
      relations.forEach((relation:string) => {
        paymentQuery.populate(relation)
      })
    }
    if (pagination) {
      paymentQuery.limit(pagination.perPage).skip(pagination.offset)
    }
    return paymentQuery.exec()
  }

  public async create (params:any):Promise<IPayment> {
    const newPayment = new PaymentModel({ ...params })
    return newPayment.save()
  }

  public async updateOne (where:Partial<IPayment>, updateData:Partial<IPayment>):Promise<boolean> {
    return PaymentModel.updateOne(where, updateData)
  }

  public async updateMany (where:any, updateData:any):Promise<any> {}
  public async deleteOne (where:any):Promise<any> {}
  public async deleteMany (where:any):Promise<any> {}
}
