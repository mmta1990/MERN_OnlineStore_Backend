import { Schema, model } from 'mongoose'
import IUser from './IUser'
import addressSchema from './Address'

const userSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, unique: true },
  totalOrders: { type: Number, default: 0 },
  wallet: { type: Number, default: 0 },
  password: { type: String },
  addresses: { type: [addressSchema], default: [] },
  createdAt: { type: Date, default: Date.now }
})
export default model<IUser>('User', userSchema)
