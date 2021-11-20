/* eslint-disable no-unused-vars */
import { model, Schema } from 'mongoose'
import PaymentStatus from './PaymentStatus'
import IPayment from './IPayment'
const paymentSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  order: { type: Schema.Types.ObjectId, ref: 'Order' },
  method: { type: String, required: true },
  amount: { type: Number, required: true },
  reserve: { type: String, required: true },
  reference: { type: String, default:null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: PaymentStatus, required: true, default: PaymentStatus.PENDING }
})
export default model<IPayment>('Payment', paymentSchema)
