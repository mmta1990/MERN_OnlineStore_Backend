/* eslint-disable no-unused-vars */
import IRepository from '../../contracts/IRepository'
import OrderStatus from '../model/OrderStatus'
import IOrder from '../model/IOrder'
import IUser from '../../users/model/IUser'
import IPagination from '../../contracts/IPagination'
export default interface IOrderRepository extends IRepository<IOrder>{
    findByStatus(status:OrderStatus):Promise<IOrder[]>
}
