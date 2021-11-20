import { model, Schema } from 'mongoose'
import OrderStatus from './OrderStatus'
import IOrder from './IOrder'
import orderLineSchema from './OrderLine'
import addressSchema from '../../users/model/Address'
const orderSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  totalPrice: { type: Number, required: true },
  finalPrice: { type: Number, required: true },
  orderLines: { type: [orderLineSchema] },
  deliveryAddress: { type: addressSchema, required: true },
  coupon: { type: Object, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: OrderStatus, required: true, default: OrderStatus.PENDING }
})
export default model<IOrder>('Order', orderSchema)
