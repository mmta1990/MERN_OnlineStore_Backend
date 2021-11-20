import { model, Schema } from 'mongoose'
import IProduct from './IProduct'
import ProductStatus from './productStatus'
const productSchema: Schema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  discountedPrice: { type: Number, default: 0 },
  thumbnail: { type: String },
  gallery: { type: [String] },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  attributes: { type: [Object], required: true },
  variations: { type: [Object] },
  priceVariations: { type: [Object] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  stock: { type: Number, default: 0 },
  purchased_count:{ type: Number, default: 0 },
  comments_count:{ type: Number, default: 0 },
  total_score:{ type: Number, default: 0 },
  views_count:{ type: Number, default: 0 },
  status: { type: ProductStatus, default: ProductStatus.INIT }
})
// productSchema.virtual('thumbnailUrl').get(function (this:IProduct) {
//   return `${process.env.APP_URL}contents/${this.thumbnail}`
// })
// productSchema.virtual('galleryUrl').get(function (this:IProduct) {
//   return this.gallery?.map((item:string) => {
//     return `${process.env.APP_URL}contents/${item}`
//   })
// })
export default model<IProduct>('Product', productSchema)
