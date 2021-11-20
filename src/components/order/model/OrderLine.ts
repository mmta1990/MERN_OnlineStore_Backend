import { Schema } from 'mongoose'
const orderLineSchema: Schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  price: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  count: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
}, {
  _id: false
})
export default orderLineSchema
