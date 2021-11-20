/* eslint-disable no-unused-vars */
import { Document } from 'mongoose'
import OrderStatus from './OrderStatus'
import IOrderLine from './IOrderLine'
import IAddress from '../../users/model/IAddress'
import IUser from 'src/components/users/model/IUser'
export default interface IOrder extends Document {
    user: string
    totalPrice: number
    finalPrice: number
    orderLines: IOrderLine[]
    deliveryAddress: IAddress
    coupon: string
    createdAt: Date
    updatedAt: Date
    status: OrderStatus

}
