/* eslint-disable no-unused-vars */
import IOrderRepository from './IOrderRepository'
import OrderModel from '../model/Order'
import OrderStatus from '../model/OrderStatus'
import IOrder from '../model/IOrder'
import IPagination from '../../contracts/IPagination'
import IUser from '../../users/model/IUser'
import IUserRepository from '../../users/repositories/IUserRepository'
import UserMongoRepository from '../../users/repositories/UserMongoRepository'
import OrderQueryInterface from '../OrderQueryInterface'
import { Types } from "mongoose";
export default class OrderMongoRepository implements IOrderRepository {
  private readonly usersRepository:IUserRepository
  constructor () {
    this.usersRepository = new UserMongoRepository()
  }

  public async findOne (ID:string, relations?:string[]):Promise<IOrder | null> {
    const orderQuery = OrderModel.findById(ID)
    if (relations && relations.length > 0) {
      relations.forEach((relation:string) => {
        orderQuery.populate(relation)
      })
    }
    return orderQuery.exec()
  }

  public async findMany (params:OrderQueryInterface, relations?:string[], pagination?:IPagination):Promise<IOrder[]> {
    const orderQueryParams:OrderQueryInterface = {}
    if (params.user_data) {
      const users = await this.usersRepository.findMany({
        $or: [
          { firstName: { $regex: params.user } },
          { lastName: { $regex: params.user } },
          { email: { $regex: params.user } }
        ]
      })
      orderQueryParams.user = { $in: users.map((user:IUser) => user._id) }
    }
    if(params.user){
      const objectID = Types.ObjectId
      orderQueryParams.user = new objectID(params.user)
    }
    const orderQuery = OrderModel.find(orderQueryParams)
    if (relations && relations.length > 0) {
      relations.forEach((relation:string) => {
        orderQuery.populate(relation)
      })
    }
    if (pagination) {
      orderQuery.limit(pagination.perPage).skip(pagination.offset)
    }
    return orderQuery.exec()
  }

  public async findByStatus (status:OrderStatus):Promise<IOrder[]> {
    return OrderModel.find({ status })
  }

  public async create (params:any):Promise<IOrder> {
    const newOrder = new OrderModel({ ...params })
    return newOrder.save()
  }

  public async updateOne (where:Partial<IOrder>, updateData:Partial<IOrder>):Promise<boolean> {
    return OrderModel.updateOne(where, updateData)
  }

  public async updateMany (where:any, updateData:any):Promise<any> {}
  public async deleteOne (where:any):Promise<any> {}
  public async deleteMany (where:any):Promise<any> {}
}
