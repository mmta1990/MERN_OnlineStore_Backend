/* eslint-disable no-unused-vars */
import { Document } from 'mongoose'
import ShipmentStatus from './ShipmentStatus'

export default interface IShipment extends Document{
    employee:string
    order:string
    selectedDateTime:Date
    deliveredAt:Date
    note:string
    status:ShipmentStatus
}
