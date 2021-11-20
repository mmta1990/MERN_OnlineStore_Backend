/* eslint-disable no-unused-vars */
import IShipmentRepository from './IShipmentRepository'
import IShipment from '../models/IShipment'
import ShipmentModel from '../models/Shipment'
import IPagination from '../../contracts/IPagination'
import ObjectInterface from '../../contracts/ObjectInterface'
import IUserRepository from '../../users/repositories/IUserRepository'
import UserMongoRepository from '../../users/repositories/UserMongoRepository'
import IUser from '../../users/model/IUser'
export default class ShipmentMongoRepository implements IShipmentRepository {
  private readonly usersRepository:IUserRepository
  constructor () {
    this.usersRepository = new UserMongoRepository()
  }

  public async findOne (ID:string):Promise<IShipment | null> {
    return ShipmentModel.findById(ID)
  }

  public async findMany (params:ObjectInterface, relations?:string[], pagination?:IPagination):Promise<IShipment[]> {
    const shipmentQueryParams:ObjectInterface = {}
    if (params.user) {
      const users = await this.usersRepository.findMany({
        $or: [
          { firstName: { $regex: params.user } },
          { lastName: { $regex: params.user } },
          { email: { $regex: params.user } }
        ]
      })
      shipmentQueryParams.employee = { $in: users.map((user:IUser) => user._id) }
    }
    const shipmentQuery = ShipmentModel.find(shipmentQueryParams)
    if (relations && relations.length > 0) {
      relations.forEach((relation:string) => {
        shipmentQuery.populate(relation)
      })
    }
    if (pagination) {
      shipmentQuery.limit(pagination.perPage).skip(pagination.offset)
    }
    return shipmentQuery.exec()
  }

  public async create (params:any):Promise<IShipment> {
    const newShipment = new ShipmentModel({ ...params })
    return newShipment.save()
  }

  public async updateOne (where:Partial<IShipment>, updateData:Partial<IShipment>):Promise<boolean> {
    return ShipmentModel.updateOne(where, updateData)
  }

  public async updateMany (where:any, updateData:any):Promise<any> {}
  public async deleteOne (where:any):Promise<any> {}
  public async deleteMany (where:any):Promise<any> {}
}
