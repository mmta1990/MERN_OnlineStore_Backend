/* eslint-disable no-unused-vars */
import { Document } from 'mongoose'
import IAddress from './IAddress'
export default interface IUser extends Document {
    firstName: string
    lastName: string
    email: string
    mobile: string
    totalOrders: number
    wallet: number
    password:string
    addresses: IAddress[]
    createdAt: Date
}
