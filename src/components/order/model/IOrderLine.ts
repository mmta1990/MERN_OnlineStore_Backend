/* eslint-disable no-unused-vars */
import { Document } from 'mongoose'
export default interface IOrderLine extends Document {
    product: string
    price: number
    discountedPrice:number
    count:number
    createdAt: Date;
}
