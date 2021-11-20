import { model, Schema } from 'mongoose'
import IProductOffer from './IProductOffer'
import productOfferItemSchema from './ProductOfferItem'
const productOfferSchema: Schema = new Schema({
  products: { type: [productOfferItemSchema], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
})

export default model<IProductOffer>('ProductOffer', productOfferSchema)
