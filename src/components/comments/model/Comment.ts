import { model, Schema } from 'mongoose'
import IComment from './IComment'
import AdviceToBuy from './AdviceToBuy'
import CommentStatus from './CommentStatus'
const commentSchema:Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  title: { type: String, required: true },
  body: { type: String, required: true },
  isBuyer: { type: Boolean, default: false },
  adviceToBuy: { type: AdviceToBuy, default: AdviceToBuy.NOT_SURE },
  status: { type: CommentStatus, default: CommentStatus.PENDING },
  createdAt: { type: Date, default: Date.now }
})

export default model<IComment>('Comment', commentSchema)
